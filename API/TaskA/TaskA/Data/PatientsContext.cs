using System;
using Microsoft.EntityFrameworkCore;
using TaskA.Models;

namespace TaskA.Data
{
    public class PatientsContext : DbContext
    {
        public PatientsContext(DbContextOptions<PatientsContext> options) : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; }
    }
}
