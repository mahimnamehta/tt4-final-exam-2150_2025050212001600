using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ApplicationsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Application>>> GetApplications()
        {
            return await _context.Applications.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Application>> GetApplication(int id)
        {
            var app = await _context.Applications.FindAsync(id);
            if (app == null) return NotFound();
            return app;
        }

        [HttpPost]
        public async Task<ActionResult<Application>> PostApplication(Application app)
        {
            _context.Applications.Add(app);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetApplication), new { id = app.ID }, app);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutApplication(int id, Application app)
        {
            if (id != app.ID) return BadRequest();

            _context.Entry(app).State = EntityState.Modified;

            try { await _context.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Applications.Any(a => a.ID == id)) return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApplication(int id)
        {
            var app = await _context.Applications.FindAsync(id);
            if (app == null) return NotFound();

            _context.Applications.Remove(app);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
