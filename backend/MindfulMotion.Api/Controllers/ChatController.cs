using Microsoft.AspNetCore.Mvc;

namespace MindfulMotion.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    // POST api/chat
    [HttpPost]
    public IActionResult Post([FromBody] ChatRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Message))
            return BadRequest();

        // TODO: Integrate with OpenAI API using API key from configuration
        return Ok(new { reply = $"[dummy] You said: {request.Message}" });
    }
}

public record ChatRequest(string Message);
