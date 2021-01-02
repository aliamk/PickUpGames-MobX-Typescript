using FluentValidation;     // IRuleBuilder

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .MinimumLength(6)
                .NotEmpty()
                .Matches("[A-Z]").WithMessage("Password must be at least 6 characters")
                .Matches("[a-z]").WithMessage("Password must contain 1 uppercase letter")
                .Matches("[0-9]").WithMessage("Password must contain a number")
                .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain nonalphanumeric characters");

            return options;
        }
    }
}