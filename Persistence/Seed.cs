using System.Collections.Generic;       // List
using System.Linq;                      // Any
using Domain;                           // Visit
using System;                           // DateTime
using Microsoft.AspNetCore.Identity;    // UserManager
using System.Threading.Tasks;           // Task

namespace Persistence
{
    public class Seed
    {
        public static /*void*/ async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            // Seed data for Users
            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        // Id = "a",
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com"
                    },
                    new AppUser
                    {
                        // Id = "b",
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com"
                    },
                    new AppUser
                    {
                        // Id = "c",
                        DisplayName = "Tom",
                        UserName = "tom",
                        Email = "tom@test.com"
                    },
                };
                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            }

            // Seed data for Visits
            if (!context.Visits.Any())
            {
                var visits = new List<Visit>
                {
                    new Visit
                    {
                        Title = "First appointment with Dr Krull",
                        Description = "Nervous first meeting with Dr Krull",
                        Category = "Appointment",
                        Date = DateTime.Now.AddMonths(-7),
                        Venue = "St Thomas' Hospital",
                        City = "London",
                    },
                    new Visit
                    {
                        Title = "Second appointment with Dr Krull",
                        Description = "Had to wait forever but had some good news so happy",
                        Category = "Appointment",
                        Date = DateTime.Now.AddMonths(-6),
                        Venue = "St Thomas' Hospital",
                        City = "London",
                    },
                    new Visit
                    {
                        Title = "Third appointment with Dr Krull",
                        Description = "Changing medications today",
                        Category = "Appointment",
                        Date = DateTime.Now.AddMonths(-5),
                        Venue = "St Thomas' Hospital",
                        City = "London",
                    },
                    new Visit
                    {
                        Title = "Last Day with Dr Kelly",
                        Description = "Got used to coming here - being transferred to St Thomas' Hospital",
                        Category = "Leaving",
                        Date = DateTime.Now.AddMonths(-8),
                        Venue = "St Bart's Hospital",
                        City = "London",
                    },
                    new Visit
                    {
                        Title = "Lots of changes",
                        Description = "Some good and bad news in today's medical report...",
                        Category = "Results Day",
                        Date = DateTime.Now.AddMonths(-9),
                        Venue = "St Bart's Hospital",
                        City = "London",
                    },
                    new Visit
                    {
                        Title = "Road Trip! (Sort of) ",
                        Description = "Referred to a specialist for the first time",
                        Category = "Appointment",
                        Date = DateTime.Now.AddMonths(-11),
                        Venue = "Manchester Royal Infirmary",
                        City = "Manchester",
                    }
                };
                context.Visits.AddRange(visits);
                context.SaveChanges();
            }
        }

    }
}