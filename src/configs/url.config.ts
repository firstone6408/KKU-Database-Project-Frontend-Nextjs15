/** @format */

export const urlConfig = {
  KKU_API_URL: "http://localhost:5000/api",
  showImage: function (path: string | undefined | null)
  {
    if (path)
    {
      if (path.startsWith("/public"))
      {
        return "http://localhost:5000" + path;
      }
      else
      {
        return path;
      }
    }
    else
    {
      return ""
    }
  }
};
