<h1>FoodByte - An online food ordering website</h1>
<h3>This is a 3-level hierarchical platform where users can order food online, restaurant owners can add/update categories and menu items, manage customer orders, and admins can manage all the restaurant owners.</h3>
<h3>Skills used: </h3>
<ul>
  <li>Next.JS</li>
  <li>MongoDB</li>
  <li>Cloudinary</li>
  <li>Tailwind CSS</li>
  <li>Stripe</li>
  <li>Google OAuth</li>
</ul>
<h3>Key features of this application: </h3>
<h4>Users: </h4>
<ul>
  <li>Login/Register using Google OAuth</li>
  <li>Add food products to your cart, including varying sizes and extra ingredients if needed</li>
  <li>Manage your payments through Stripe</li>
  <li>Edit your profile, upload profile photos through Cloudinary</li>
</ul>
<h4>Restaurant managers: </h4>
<ul>
  <li>Add/update/delete new food categories</li>
  <li>Add details of menu items linked with each category, edit their sizes and extra ingredient options</li>
  <li>Upload pictures of food items through Cloudinary</li>
  <li>Manage user's orders after payment</li>
</ul>
<h4>Admins (Website maintainers): </h4>
<ul>
  <li>Update restaurant managers role to users and vice-versa</li>
  <li>Manage bestsellers items in the website</li>
  <li>Add multiple login options like Facebook, Microsoft, etc.</li>
</ul>

<h3>Steps to run this project in your device: </h3>
<p>Create an empty directory and run the following commands in the terminal: </p>

```bash
  git clone https://github.com/Kaarti22/FoodByte.git
  cd FoodByte
  npm i
```
<p>Also, create a .env file in the root directory of the project and your environment variables. <br/> The following variables must be added: </p>

```bash
  MONGO_URL=

  NEXTAUTH_URL= "http://localhost:3000/"
  SECRET= 
  
  GOOGLE_CLIENT_ID=
  GOOGLE_CLIENT_SECRET=
  
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
  CLOUDINARY_PRESET_NAME=
  
  STRIPE_SK=
  STRIPE_PK=
  
  STRIPE_SIGN_SECRET=
  stripe_card_no=
```

<p>Finally to run this project, enter the following command: </p>

```bash
  npm run dev
```

<p>Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.<br/><br/>You can start editing the page by modifying `app/page.jsx`. The page auto-updates as you edit the file.<br/></br>This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
</p>
