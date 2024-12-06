"use client"; 

import { useUser } from '@clerk/nextjs'; 
import { TextInput, Select, FileInput, Button } from 'flowbite-react';

// reactquill only work on  client side and this page is firstly loaded a server side so we need to import it into a different way; 
import dynamic from 'next/dynamic'; 
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false }); 
// ssr: false means that he should only be client side; 
//https://dev.to/a7u/reactquill-with-nextjs-478b
import 'react-quill-new/dist/quill.snow.css';  

export default function CreatePostPage() {
    const {isSignedIn, user, isLoaded} = useUser(); 

    const [file, setFile] = useState(null); 
    const [imageUploadProgress, setImageUploadProgress] = useState(null); 
    const [imageUploadError, setImageUploadError] = useState(null); 
    const [formData, setFormData] = useState({}); 

    if(!isLoaded) {
        return null;
        // the if statement above here will fix the error related to "only plain object should be added..." }
    }

    if (isSignedIn && user.publicMetadata.isAdmin){
        return (
            <div className="p-3 max-w-3xl mx-auto min-h-screen">
             <h1 className="text-center text-3xl my-7 font-semibold">
                Create a post
             </h1>
             <form className="flex flex-col gap-4">
               <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput 
                      type='text'
                      placeholder='Title'
                      required
                      id="title"
                      className='flex-1'
                    />
                    <Select>
                        <option value='uncategorized'>Select a category</option>
                        <option value='javascript'>javascript</option>
                        <option value='reactjs'>React.js</option>
                        <option value='nextjs'>Next.js</option>

                    </Select>
               </div>
               <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
                <FileInput type='file' accept='image/*' />
                <Button
                  type='button'
                  gradientDuoTone='purpleToBlue'
                  size='sm'
                  outline
                >
                    
                    Upload</Button>
               </div>

               <ReactQuill 
                 theme="snow"
                 placeholder="Write something..."
                 className="h-72 mb-12"
                 required
               />
               <Button type="submit" gradientDuoTone="purpleToPink">
                 Publish
               </Button>
             </form>
            </div>
          ) 
    } else {
        return (
            <h1 className="text-center text-3xl my-7 font-semibold">
                You are not authorized to vie this page
                </h1>
        )
    }
   
  
}
