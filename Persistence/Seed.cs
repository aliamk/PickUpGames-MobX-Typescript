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
                        Id = "a",
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "bob@test.com",
                        EmailConfirmed = true
                    },
                    new AppUser
                    {
                        Id = "b",
                        DisplayName = "Jane",
                        UserName = "jane",
                        Email = "jane@test.com",
                        EmailConfirmed = true
                    },
                    new AppUser
                    {
                        Id = "c",
                        DisplayName = "Soraya",
                        UserName = "soraya",
                        Email = "soraya@test.com",
                        EmailConfirmed = true
                    },
                    new AppUser
                    {
                        Id = "d",
                        DisplayName = "Safina",
                        UserName = "safina",
                        Email = "safina@test.com",
                        EmailConfirmed = true
                    },
                    new AppUser
                    {
                        Id = "e",
                        DisplayName = "Li",
                        UserName = "Li",
                        Email = "lijie@test.com",
                        EmailConfirmed = true
                    },
                    new AppUser
                    {
                        Id = "f",
                        DisplayName = "Joaquin",
                        UserName = "Joaquin",
                        Email = "joaquin@test.com",
                        EmailConfirmed = true
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
                        Title = "Cycling",
                        Description = "Bring your own bikes and repair kits",
                        Date = DateTime.Now.AddMonths(-7),
                        Venue = "Regents Park",
                        City = "London",
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-2)
                            }
                        }
                    },
                    new Visit
                    {
                        Title = "Tennis",
                        Description = "For amateurs",
                        Date = DateTime.Now.AddMonths(2),
                        Venue = "Kiburn tennis centre",
                        City = "London",
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(-1)
                            },
                            new UserVisit
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(-1)
                            },
                            new UserVisit
                            {
                                AppUserId = "e",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(-2)
                            },
                        }
                    },
                    new Visit
                    {
                        Title = "Basketball",
                        Description = "Friendly game of basketball - non-competitive",
                        Date = DateTime.Now.AddMonths(-5),
                        Venue = "Enfield Sports Centre",
                        City = "London",
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(1)
                            },
                            new UserVisit
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(1)
                            },
                        }
                    },
                    new Visit
                    {
                        Title = "Football",
                        Description = "I'm 40 - looking for others about that age for some footie",
                        Date = DateTime.Now.AddMonths(2),
                        Venue = "St Bart's Hospital",
                        City = "London",
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "c",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(2)
                            },
                            new UserVisit
                            {
                                AppUserId = "a",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(2)
                            },
                        }
                    },
                    new Visit
                    {
                        Title = "Basketball",
                        Description = "Join us for a FUN game",
                        Date = DateTime.Now.AddMonths(1),
                        Venue = "Southwark Sports Hall",
                        City = "London",
                        UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "b",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(3)
                            },
                            new UserVisit
                            {
                                AppUserId = "c",
                                IsHost = false,
                                DateJoined = DateTime.Now.AddMonths(3)
                            },
                        }
                    },
                    new Visit
                    {
                        Title = "Football",
                        Description = "Looking for 5 people to join us",
                        Date = DateTime.Now.AddMonths(-11),
                        Venue = "Camberwell Football Hall",
                        City = "London",
                         UserVisits = new List<UserVisit>
                        {
                            new UserVisit
                            {
                                AppUserId = "a",
                                IsHost = true,
                                DateJoined = DateTime.Now.AddMonths(4)
                            }
                        }
                    }
                };
                context.Visits.AddRange(visits);
                context.SaveChanges();
            }
        }

    }
}