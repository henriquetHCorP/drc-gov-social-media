import Post from '../../../../lib/models/post.model'; 
import { connect } from '../../../../lib/mongodb/mongoose'; 
import { currentUser } from '@clerk/nextjs/server'; 
export const POST = async (req) => {
    const user = await currentUser(); 
     try {
       await connect(); 
       const data = await req.json(); 
       // above here we are getting the infor mation we sent from the body inside the create post page.js cfr const res fetch body...
    //    console.log('user', user.publicMetadata); 
    //    console.log('data', data); 
       if (
        !user || 
        user.publicMetadata.userMongoId !== data.userMongoId ||
        user.publicMetadata.isAdmin !== true
       ) {
        return new Response('Unauthorized', {
            status:401, 
        });
       }
       const slug = data.title
        .split(' ')
        .join('-')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, ''); 
        //above here remove anything expect a-z A-Z or 0-9
    const newPost = await Post.create({
        userId: user.publicMetadata.userMongoId,
        content: data.content, 
        title: data.title, 
        image: data.image, 
        category: data.category,
        slug,
    }); 
    await newPost.save(); 
    return new Response.apply(JSON.stringify(newPost), {
        status: 200,
    });
     } catch(error) {
     console.log('Error creating post:', error); 
     return new Response('Error creating post', {
        status: 500, 
     })
     }
}