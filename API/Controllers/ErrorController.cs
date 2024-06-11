using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ErrorController : BaseApiController {
        [HttpGet("not-found")]
        public ActionResult GetNotFound() {
            return NotFound(); //404
        }

        [HttpGet("bad-request")]
        public ActionResult GetBadRequest() {
            return BadRequest(new ProblemDetails{Title = "This is a bad request"}); 
        }

        [HttpGet("unauthorized")]
        public ActionResult GetUnauth() {
            return Unauthorized(); 
        }
        
        [HttpGet("validation-error")]
        public ActionResult GetValidationError() {
            ModelState.AddModelError("Problem1", "first error");
            ModelState.AddModelError("Problem2", "second error");
            return ValidationProblem();
        }

        [HttpGet("server-error")]
        public ActionResult GetServerError() {
            throw new Exception("This is a server error");
        }
    }
}