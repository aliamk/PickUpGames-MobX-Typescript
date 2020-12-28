using System.Collections.Generic;   // List
using System.Linq;                  // Any
using Domain;                       // Visit
using System;                       // DateTime

namespace Persistence
{
    public class Seed
    {
        public static void SeedData(DataContext context)
        {
            if (!context.Visits.Any())
            {
                var visits = new List<Visit>
                {
                    new Visit
                    {
                        Title = "First appointment with Dr Krull",
                        Description = "Nervous first meeting with Dr Krull",
                        Date = DateTime.Now.AddMonths(-7),
                        Location = "St Thomas' Hospital, London"
                    },
                    new Visit
                    {
                        Title = "Second appointment with Dr Krull",
                        Description = "Had to wait forever but had some good news so happy",
                        Date = DateTime.Now.AddMonths(-6),
                        Location = "St Thomas' Hospital, London"
                    },
                    new Visit
                    {
                        Title = "Third appointment with Dr Krull",
                        Description = "Changing medications today",
                        Date = DateTime.Now.AddMonths(-5),
                        Location = "St Thomas' Hospital, London"
                    },
                    new Visit
                    {
                        Title = "Last Day with Dr Kelly",
                        Description = "Got used to coming here - being transferred to St Thomas' Hospital",
                        Date = DateTime.Now.AddMonths(-8),
                        Location = "St Bart's Hospital, London"
                    },
                    new Visit
                    {
                        Title = "Lots of changes",
                        Description = "Some good and bad news in today's medical report...",
                        Date = DateTime.Now.AddMonths(-9),
                        Location = "St Bart's Hospital, London"
                    }
                };
                context.Visits.AddRange(visits);
                context.SaveChanges();
            }
        }

    }
}