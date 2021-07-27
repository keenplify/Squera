import { Flex, ModalBody, ModalFooter, Text, useColorMode } from "@chakra-ui/react"
import { useContext, useState } from "react"
import { Fragment } from "react"
import { FiChevronLeft, FiChevronRight, FiChevronsRight } from "react-icons/fi"
import DefaultButton from "../DefaultButton"
import { DefaultInput } from "../DefaultInput"
import ReactCrop, { Crop } from 'react-image-crop';
import "react-image-crop/dist/ReactCrop.css";
import axios from "axios"
import { rootServer } from "../../utils/server"
import { sanitizeString } from "../../utils/sanitize"
import { UserResponse } from "../../utils/UserResponse"
import UserContext from "../../utils/user-context"
import { useRouter } from "next/router"

interface Props {
  handleSuccess(values?:Values): any
  handleBack(): any
  schoolId: string | undefined
}

interface Values {
  imgUrl: string
}

export const RegisterSchool_PageTwo = ({schoolId, handleSuccess, handleBack}:Props)=> {
  if (schoolId === undefined) {
    return <Text color='red' p='1em'>
      There was an error while registering your school. Please try again. (School ID not found)
    </Text>
  }

  const router = useRouter()
  const [crop, setCrop] = useState<Crop>({ 
    aspect: 1,
    width: 100,
    unit: '%'
  });
  const { colorMode } = useColorMode()
  const [ src, setSrc ] = useState<string | ArrayBuffer | null>("");
  const [ imgRef, setImgRef ] = useState<HTMLImageElement>();
  const canSubmit = typeof src === 'string' && src!.length > 0
  const [ blob, setBlob ] = useState<Blob>()
  const userResponse:UserResponse = useContext(UserContext)
  const [ isSubmitting, setIsSubmitting ] = useState(false);


  const handleSubmit = () => {
    if (
      imgRef === undefined || 
      crop.x === undefined || 
      crop.y === undefined || 
      crop.width === undefined || 
      crop.height === undefined
    )
      return

    setIsSubmitting(true)

    // const fileName = "img.jpg"
    const canvas = document.createElement("canvas");
    const scaleX = imgRef.naturalWidth / imgRef.width;
    const scaleY = imgRef.naturalHeight / imgRef.height;
    canvas.width = crop.width;
    canvas.height = crop.height ;
    const ctx = canvas.getContext("2d");

    ctx?.drawImage(
      imgRef,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    canvas.toBlob((blob) => {
      if (!blob) {
        return;
      }

      setBlob(blob)

      if (blob === undefined){
        return
      }

      if (!canSubmit) {
        handleSuccess() //add value here
        return
      }

      const data = new FormData()

      data.append('file', blob)
      data.append('forId', schoolId)
      data.append('type', 'logo')

      axios.post(rootServer+'/images/add', data, {
        headers: {
          Authorization: `Bearer ${sanitizeString(userResponse.token)}`,
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        console.log(res)
        setIsSubmitting(false)
        router.push('/'+schoolId);
      }).catch((err)=>console.log(err))

    }, "image/jpeg");
  }

  return (
    <Fragment>
      <ModalBody>
        <Flex direction='column'>
          <Flex>
            <Text fontSize="sm" p='1em' color={colorMode === 'light' ? 'GrayText' : 'whiteAlpha.800'}>
              Thank you for registering your school! But before we fully register it, can you give us the logo of the school?</Text>
          </Flex>
          <Flex>
            <DefaultInput 
              id="file"
              name="file"
              type="file"
              accept="image/*" 
              placeholder="File Upload"
              onChange={(e)=>{
                if(e.target.files && e.target.files.length > 0) {
                  const reader = new FileReader();
                  reader.addEventListener('load', ()=> {
                    setSrc(reader.result)
                  })
                  reader.readAsDataURL(e.target.files[0]);
                } else {setSrc('')}
              }}
              noFormik
              disabled={isSubmitting}
            />
          </Flex>
          <Flex w="100%" padding="1em" style={{position:'relative'}} align="center" justify="center">
              {
                typeof (src) === 'string' 
                && src.length>0 && <ReactCrop 
                  src={src}
                  crop={crop}
                  ruleOfThirds
                  onImageLoaded={(img)=> setImgRef(img)}
                  onChange={(newCrop:any) => setCrop(newCrop)}
                  disabled={isSubmitting}
                />
              }
          </Flex>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Flex direction='column' grow={1}>
          <DefaultButton 
            colorScheme={colorMode === 'light' ? 
            canSubmit ? 'green' : 'orange'
            : 'gray'}
            color='white'
            icon={canSubmit ? <FiChevronRight />: <FiChevronsRight/>}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >{canSubmit ? 'Submit': 'Skip'}</DefaultButton>
          <DefaultButton bgColor='blue.500' color='white' icon={<FiChevronLeft/>} onClick={handleBack}>Back</DefaultButton>
          {/* <button onClick={()=>setIsSubmitting(false)}>ResetSubmit</button> */}
        </Flex>
      </ModalFooter>
    </Fragment>
  )
}