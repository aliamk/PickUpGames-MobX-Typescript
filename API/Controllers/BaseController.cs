using MediatR;                                      // IMediator
using Microsoft.AspNetCore.Mvc;                     // ControllerBase
using Microsoft.Extensions.DependencyInjection;     // GetService

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        private IMediator _mediator;
        protected IMediator Mediator => _mediator ?? (_mediator = HttpContext.RequestServices.GetService<IMediator>());
    }
}