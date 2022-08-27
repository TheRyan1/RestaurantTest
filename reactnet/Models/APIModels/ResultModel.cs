using System.ComponentModel;

namespace reactnet.Models.APIModels;

public class ResultModel
{
    [DefaultValue(false)] public bool IsSuccess { get; set; }
    public string Message { get; set; }
    public object Data { get; set; }
}