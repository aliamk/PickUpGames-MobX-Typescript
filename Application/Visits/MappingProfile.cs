using System.Linq;
using AutoMapper;           // Profile
using Domain;               // Visit

// Derive from the profile class provided by auto mapper 
// Generate constructor: MappingProfile - create FROM and TO maps inside

namespace Application.Visits
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Visit, VisitDto>();               // First map (from Visit to VisitDto)
            CreateMap<UserVisit, AttendeeDto>()         // Second map (from UserVisit to AttendeeDto) 
                .ForMember(d => d.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.AppUser.DisplayName));

        }
    }
}

//.ForMember(d => d.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
//.ForMember(d => d.Following, o => o.MapFrom<FollowingResolver>());

// destination => destination.Username
// option => option.MapFrom
// source => source.AppUser.UserName  

