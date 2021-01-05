namespace Domain
{
    public class Photo
    {
        public string Id { get; set; }              // ID of the photo
        public string Url { get; set; }             // The download Url for the photo
        public bool isMain { get; set; }            // Is the photo the main photo for the user
    }
}