using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using TaskA.Data;
using TaskA.Models;

namespace TaskA.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class PatientsController : ControllerBase
    {
        private PatientsContext context;
        private IWebHostEnvironment webHostEnvironment;

        public PatientsController(PatientsContext context, IWebHostEnvironment webHostEnvironment)
        {
            this.context = context;
            this.webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> Get()
        {
            return await this.context.Patients.OrderBy(a => a.Name).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> Get([FromRoute]Guid id)
        {
            var patient = await this.context.Patients.FindAsync(id);
            if (patient == null) return this.NotFound();
            return patient;
        }

        [HttpPost]
        public async Task<ActionResult<Patient>> Post()
        {
            if (!this.Request.Form.ContainsKey("jsonObj") || this.Request.Form.Files == null || !this.Request.Form.Files.Any())
                return this.BadRequest();

            var jsonObj = this.Request.Form.Where(a => a.Key == "jsonObj").First().Value;
            var patient = JsonConvert.DeserializeObject<Patient>(new StringReader(jsonObj).ReadToEnd());

            if (string.IsNullOrWhiteSpace(patient.Name) ||
                string.IsNullOrWhiteSpace(patient.Email) ||
                !Regex.Match(patient.Email, @"\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*").Success)
                return this.BadRequest();

            patient.Id = Guid.NewGuid();
            patient.RecordCreationDate = DateTime.Now;

            this.context.Patients.Add(patient);
            await this.context.SaveChangesAsync();

            IFormFile file = Request.Form.Files.First();
            string path = Path.Combine(this.webHostEnvironment.WebRootPath, "photos", $"{patient.Id}.png");

            using (var fileStream = new FileStream(path, FileMode.Create))
                await file.CopyToAsync(fileStream);

            return patient;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var patient = await this.context.Patients.FindAsync(id);
            if (patient == null) return this.NotFound();

            this.context.Patients.Remove(patient);
            await this.context.SaveChangesAsync();
            return this.Ok();
        }
    }
}
