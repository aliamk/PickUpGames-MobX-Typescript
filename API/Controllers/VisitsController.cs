using System;                       // Guid
using System.Collections.Generic;   // List
using System.Threading.Tasks;       // Task
using Application.Visits;           // new List.Query
using Domain;                       // Visit
using MediatR;                      // Mediator
using Microsoft.AspNetCore.Mvc;     // Route + ApiController


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VisitsController : ControllerBase
    {
        private readonly IMediator _mediator;
        public VisitsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // Request to see all Visit items in the database - see the List Handler in List.cs
        [HttpGet]
        public async Task<ActionResult<List<Visit>>> List()
        {
            return await _mediator.Send(new List.Query());
        }


        // Request for a single item  - see the Details Handler in Details.cs
        [HttpGet("{id}")]
        public async Task<ActionResult<Visit>> Details(Guid id)
        {
            return await _mediator.Send(new Details.Query { Id = id }); // initialise Id 
        }
        /*
        // For users to add their own Visit item to the database - see the Create Handler in Create.cs
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await _mediator.Send(command);
        }

        //  For users to edit a database item
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await _mediator.Send(command);
        }

        // For users to delete database items 
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await _mediator.Send(new Delete.Command { Id = id });
        } */
    }
}