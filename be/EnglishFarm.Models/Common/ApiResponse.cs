namespace EnglishFarm.Models.Common;

public class ApiResponse<T>
{
    public int Code { get; set; } = 200;
    public string Message { get; set; } = "Success";
    public T? Data { get; set; }

    public static ApiResponse<T> Ok(T data, string msg = "Success") => new() { Code = 200, Message = msg, Data = data };
    public static ApiResponse<T> Fail(int code, string msg) => new() { Code = code, Message = msg, Data = default };
}
