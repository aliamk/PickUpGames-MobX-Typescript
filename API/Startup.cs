using System.Text;                                      // Encoding
using System.Threading.Tasks;                           // Task
using API.Middleware;                                   // ErrorHandlingMiddleware
using API.SignalR;                                      // ChatHub
using Application.Interfaces;                           // IJwtGenerator
using Application.Visits;                               // (typeof(List))
using AutoMapper;                                       // AddAutoMapper
using Domain;                                           // AppUser
using FluentValidation.AspNetCore;                      // AddFluentValidation
using Infrastructure.Photos;                            // CloudinarySettings
using Infrastructure.Security;                          // JwtGenerator
using MediatR;                                          // AddMediatR
using Microsoft.AspNetCore.Authentication.JwtBearer;    // JwtBearerDefaults
using Microsoft.AspNetCore.Authorization;               // AuthorizationPolicyBuilder
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;                    // IdentityBuilder
using Microsoft.AspNetCore.Mvc.Authorization;           // AuthorizeFilter
using Microsoft.EntityFrameworkCore;                    // UseSqlite
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;                   // SymmetricSecurityKey
using Persistence;                                      // DbContext


namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Connect to the database
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseLazyLoadingProxies();
                opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });
            // Solve cross-origin problems
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000").AllowCredentials();
                });
            });
            // For decoupling asnyc handlers from requests
            services.AddMediatR(typeof(List.Handler).Assembly);
            // For mapping to DTOs
            services.AddAutoMapper(typeof(List.Handler));
            // For the chat component using SignalR and websockets
            services.AddSignalR();
            // Fluid Validation for checks before sending data to command handlers
            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                opt.Filters.Add(new AuthorizeFilter(policy));
            })
                .AddFluentValidation(cfg =>
            {
                cfg.RegisterValidatorsFromAssemblyContaining<Create>();
            });
            // Identity builder
            var builder = services.AddIdentityCore<AppUser>();
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            identityBuilder.AddEntityFrameworkStores<DataContext>();
            identityBuilder.AddSignInManager<SignInManager<AppUser>>();

            // Custom auth policy for hosts of visits
            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("IsVisitHost", policy =>
                {
                    policy.Requirements.Add(new IsHostRequirement());
                });
            });

            services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>(); // AddTransient = for only the lifetime of the operation (not complete request)

            // JWT TOKEN GENERATOR
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateAudience = false,
                        ValidateIssuer = false
                        // ValidateLifetime = true,
                        // ClockSkew = TimeSpan.Zero
                    };
                    // SIGNALR - GET TOKEN FOR THE HUB CONTEXT
                    opt.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;                  // Get reference to path the request comes on
                            if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/chat")))
                            {
                                context.Token = accessToken;
                            }

                            return Task.CompletedTask;
                        }
                    };
                });

            // Strongly typing the settings
            services.AddScoped<IJwtGenerator, JwtGenerator>();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            services.Configure<CloudinarySettings>(Configuration.GetSection("Cloudinary"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMiddleware<ErrorHandlingMiddleware>();
            if (env.IsDevelopment())
            {
                // app.UseDeveloperExceptionPage();
            }

            // app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/chat");
            });
        }
    }
}
