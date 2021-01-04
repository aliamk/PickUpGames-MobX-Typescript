using System;                               // Guid
using System.Collections.Generic;           // List
using System.Threading.Tasks;               // Task
using Application.Visits;                   // new List.Query
using Domain;                               // Visit
using MediatR;                              // Mediator
using Microsoft.AspNetCore.Authorization;   // Authorize
using Microsoft.AspNetCore.Mvc;             // Route + ApiController


namespace API.Controllers
{
    public class VisitsController : BaseController
    {
        // Request to see all Visit items in the database - see the List Handler in List.cs
        [HttpGet]
        public async Task<ActionResult<List<VisitDto>>> List()
        {
            return await Mediator.Send(new List.Query());
        }

        // Request for a single item  - see the Details Handler in Details.cs
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<VisitDto>> Details(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id }); // initialise Id 
        }

        // For users to CREATE their own Visit item to the database - see the CREATE Handler in Create.cs
        [HttpPost]
        public async Task<ActionResult<Unit>> Create(Create.Command command)
        {
            return await Mediator.Send(command);
        }

        //  For users to EDIT a database item
        [HttpPut("{id}")]
        [Authorize(Policy = "IsVisitHost")]
        public async Task<ActionResult<Unit>> Edit(Guid id, Edit.Command command)
        {
            command.Id = id;
            return await Mediator.Send(command);
        }

        // For users to DELETE database items 
        [HttpDelete("{id}")]
        [Authorize(Policy = "IsVisitHost")]
        public async Task<ActionResult<Unit>> Delete(Guid id)
        {
            return await Mediator.Send(new Delete.Command { Id = id });
        }

        [HttpPost("{id}/attend")]
        public async Task<ActionResult<Unit>> Attend(Guid id)
        {
            return await Mediator.Send(new Attend.Command { Id = id });
        }

        [HttpDelete("{id}/attend")]
        public async Task<ActionResult<Unit>> Unattend(Guid id)
        {
            return await Mediator.Send(new Unattend.Command { Id = id });
        }
    }
}