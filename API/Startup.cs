using System.Text;                                      // Encoding
using API.Middleware;                                   // ErrorHandlingMiddleware
using Application.Interfaces;                           // IJwtGenerator
using Application.Visits;                               // (typeof(List))
using Domain;                                           // AppUser
using FluentValidation.AspNetCore;                      // AddFluentValidation
using Infrastructure.Security;                          // JwtGenerator
using MediatR;                                          // AddMediatR
using Microsoft.AspNetCore.Authentication.JwtBearer;    // JwtBearerDefaults
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;                    // IdentityBuilder
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
                opt.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
            });
            // Solve cross-origin problems
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
                });
            });
            // For decoupling asnyc handlers from requests
            services.AddMediatR(typeof(List.Handler).Assembly);
            // Fluid Validation for checks before sending data to command handlers
            services.AddControllers()
                .AddFluentValidation(cfg =>
            {
                cfg.RegisterValidatorsFromAssemblyContaining<Create>();
            });
            // Identity builder
            var builder = services.AddIdentityCore<AppUser>();
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            identityBuilder.AddEntityFrameworkStores<DataContext>();
            identityBuilder.AddSignInManager<SignInManager<AppUser>>();

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
                });

            services.AddScoped<IJwtGenerator, JwtGenerator>();
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
            });
        }
    }
}
