export async function createPost(formData: FormData) {
    'use server'
 
    const rawFormData = {
      title: formData.get('title'),
      metakeywords: formData.get('metakeys'),
      metadescription: formData.get('metadesc'),
    }

    console.log(rawFormData);
 
    // mutate data
    // revalidate cache
  }