using Microsoft.AspNetCore.Mvc;

namespace MindfulMotion.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CalendarController : ControllerBase
{
    [HttpGet("gmail")]
    public IActionResult GetGmailEvents()
    {
        // TODO: Integrate with Google Calendar API via OAuth2
        var events = new[]
        {
            new { id = 1, title = "Voorbeeld afspraak", time = "09:00" },
            new { id = 2, title = "Lunch", time = "12:00" }
        };
        return Ok(events);
    }
}
