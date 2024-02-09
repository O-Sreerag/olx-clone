import { Fragment, useState, FormEvent } from 'react';
import './Create.css';
import Header from '../Header/Header';
import supabase from '../../config/supabase'; // Import the Supabase client

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null); // State to store selected image file

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log("form submit")
      
      let imageUrl: string | undefined = undefined;
      // Upload the image file to Supabase Storage if it exists
      if (imageFile) {
        console.log(imageFile)
        const { data: imageUploadData, error: imageUploadError } = await supabase.storage
          .from('my-images')
          .upload(`images/${imageFile.name}`, imageFile);
        if (imageUploadError) {
          console.error('Error uploading image:', imageUploadError.message);
          return;
        }
        console.log('Image uploaded successfully:', imageUploadData);
        imageUrl = imageUploadData?.path;
      }
  
      // Insert the data into the 'products' table in Supabase
      const { data: productData, error: productError } = await supabase
        .from('products')
        .insert([{ name, category, price, image_url: imageUrl }]);
      if (productError) {
        console.error('Error adding product:', productError.message);
        return;
      }
      console.log('Product added successfully:', productData);
  
      // Clear the form fields after successful submission
      setName('');
      setCategory('');
      setPrice('');
      setImageFile(null);
    } catch (error) {
      console.error('Error adding product:', (error as Error).message);
    }
  };  


  return (
    <Fragment>
      <Header />
      <div className="card">
        <div className="centerDiv">
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="name">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="name"
              name="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label htmlFor="category">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <br />
            <label htmlFor="price">Price</label>
            <br />
            <input
              className="input"
              type="number"
              id="price"
              name="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <br />
            <label htmlFor="image">Image</label>
            <br />
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setImageFile(file);
                }
              }}
            />
            <br />
            <button type="submit" className="uploadBtn">Upload and Submit</button>
          </form>
          <br />
          {imageFile && (
            <img alt="Selected Image" src={URL.createObjectURL(imageFile)} style={{ width: '200px', height: '200px' }} />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Create;
