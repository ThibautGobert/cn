import Cropper from "react-easy-crop";
import {useEffect, useState} from "react";

const ProfilePicture = ({user, onImageInfo})=> {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [croppedArea, setCroppedArea] = useState(null)
    const [croppedAreaPixel, setCroppedAreaPixel] = useState(null)
    const [zoom, setZoom] = useState(1)
    const [image, setImage] = useState('')
    const aspectRatio = 1
    const onCropAreaChange = (croppedArea, croppedAreaPixels) => {
        setCroppedArea(croppedArea)
        setCroppedAreaPixel(croppedAreaPixels)
        onImageInfo(image, croppedArea, croppedAreaPixels)
    }
    const onChangeImage = async (e, croppedArea)=> {
        let file = e.target.files[0]; // Récupère le fichier
        let reader = new FileReader();

        reader.onload = function(e) {
            setImage(e.target.result)
            onImageInfo(e.target.result, croppedArea, croppedAreaPixel)
        }

        reader.readAsDataURL(file);
    }

    const Output = ({ image, croppedArea }) => {
        const scale = 100 / croppedArea.width;
        const transform = {
            x: `${-croppedArea.x * scale}%`,
            y: `${-croppedArea.y * scale}%`,
            scale,
            width: "calc(100% + 0.5px)",
            height: "auto"
        };

        const imageStyle = {
            transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
            width: transform.width,
            height: transform.height
        };

        return (
            <div
                className="output"

            >
                <img src={image} alt="" style={imageStyle} />
            </div>
        );
    };

    return (
        <>
            <div className="profile-image-cropper">
                {image && croppedArea &&
                    <div className="row mb-3 justify-content-center">
                        <div className="col-md-6 d-flex justify-content-center">
                            <Output image={image} croppedArea={croppedArea}></Output>
                        </div>
                    </div>
                }
                {image && <div className="position-relative" style={{height: '300px'}}>
                    <Cropper
                        disableAutomaticStylesInjection={true}
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspectRatio}
                        onCropChange={setCrop}
                        onCropAreaChange={onCropAreaChange}
                        onZoomChange={setZoom}
                        gridColor="#ff0000"
                    />
                </div>
                }
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label"></label>
                            <input onChange={onChangeImage} className="form-control" type="file" id="formFile" />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
export default ProfilePicture
