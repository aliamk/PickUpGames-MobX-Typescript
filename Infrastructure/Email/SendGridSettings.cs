namespace Infrastructure.Email
{
    public class SendGridSettings
    {
        // Match them to the user-secrets
        public string User { get; set; }
        public string Key { get; set; }
    }
}