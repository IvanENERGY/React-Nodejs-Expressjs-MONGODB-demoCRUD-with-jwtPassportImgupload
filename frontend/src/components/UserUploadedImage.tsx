import { IUserUploadedImage } from "../interface/IUserUploadedImage";

interface props{
    image:IUserUploadedImage;
}
export const UserUploadedImage = (props:props)=>{
    const {image}=props;
   
    function convertPath(filePath:string) {
        // Replace backslashes with forward slashes
        var unixPath = filePath.replace(/\\/g, '/');
        // Remove leading "public" if present
        unixPath = unixPath.replace(/^public\//, '/');
        return `${process.env.REACT_APP_BACKEND_URL}${unixPath}`;
    }
    console.log(convertPath(image.path));
    return (
            <tr>
               <td>{image.filename}</td> 
               <td> <img src={convertPath(image.path)} alt={"alttext: "+image.filename} /></td> 
            </tr>
    )
}