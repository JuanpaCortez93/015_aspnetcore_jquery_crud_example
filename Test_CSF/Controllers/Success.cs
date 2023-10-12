using Microsoft.AspNetCore.Mvc;

namespace Test_CSF.Controllers
{
    public class Success : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
