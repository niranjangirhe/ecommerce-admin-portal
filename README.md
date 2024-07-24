# StoreOps: Next.js 14 E-Commerce Solution

[checkout this video](https://youtu.be/iBbT-Pzn-aA) from more detail

## Introduction

StoreOps is a comprehensive Next.js 14 e-commerce solution that includes a multi-store admin portal and a customer-facing storefront. This project provides a full-featured platform for managing multiple e-commerce stores from a single admin interface, along with a responsive frontend for customers.

### Key Features:

#### Admin Portal:

- Multi-store management
- Product and order management
- Analytics dashboard
- Scalable APIs for frontend integration

#### Customer Storefront:

- Responsive design
- Shopping cart functionality
- Product filtering and search
- Stripe payment integration

This project demonstrates the power of Next.js 14 in creating a full-stack e-commerce solution, utilizing the latest web technologies to provide a seamless experience for both store administrators and customers.

## Setup Guide

Follow these steps to set up the StoreOps project locally:

1. Clone the repository:

```
git clone https://github.com/niranjangirhe/storeops-admin-portal.git
```

2. Install dependencies (Node.js version 20 is recommended):

```
npm i
```

3. Set up environment variables as per the sample.env file.

4. Start the development server:

```
npm run dev
```

Ensure you have access to all necessary services and replace the placeholder values with your actual credentials.

## Additional Requirements

- Clerk account for authentication
- Stripe account for payment processing
- Cloudinary account for image hosting
- MySQL database

Make sure you have accounts set up with these services and have obtained the necessary API keys and credentials.

## API Usage

The admin portal provides APIs that can be used by the storefront or other applications. The base URL for API requests is:

```
https://your-admin-portal-domain.com/api/{storeId}
```

Replace 'admin-portal-domain' with the actual domain where your admin portal is hosted. The `{storeId}` parameter is the ID of the specific store you want to interact with.

If you are using the StoreOps sample frontend UI, add the following to your frontend .env file:

```
NEXT_PUBLIC_API_URL=https://admin-portal-domain/api/{storeId}
```

### Available API Endpoints

- Billboards: `/api/{storeId}/billboards`
- Categories: `/api/{storeId}/categories`
- Sizes: `/api/{storeId}/sizes`
- Colors: `/api/{storeId}/colors`
- Products: `/api/{storeId}/products`
- Orders: `/api/{storeId}/orders`

For more detailed information about the StoreOps project and its API, please visit our documentation:

[StoreOps Documentation](https://storeops-admin.vercel.app/docs)

## Project Structure

```
├── actions/
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── (root)/
│   └── api/
├── assets/
├── components/
│   └── ui/
├── docs/
├── hooks/
├── lib/
├── prisma/
├── providers/
└── public/
```

- `actions/`: Server-side actions
- `app/`: Main application directory (Next.js 14 app router)
  - `(auth)/`: Authentication-related pages
  - `(dashboard)/`: Dashboard pages and components
  - `(root)/`: Root-level pages
  - `api/`: API routes
- `assets/`: Static assets like images and SVGs
- `components/`: Reusable React components
  - `ui/`: UI-specific components
- `docs/`: Documentation files
- `hooks/`: Custom React hooks
- `lib/`: Utility functions and libraries
- `prisma/`: Prisma ORM configuration
- `providers/`: React context providers
- `public/`: Publicly accessible files

## Store Front End Setup Guide

Follow these steps to set up the StoreOps store frontend example project on your local machine:
[link](https://github.com/niranjangirhe/storeops-store-frontend) to frontend project github repo

1. Clone the repository:

```
git clone https://github.com/niranjangirhe/storeops-store-frontend.git
```

2. Install dependencies (Node.js version 20 is recommended):

```
npm i
```

3. Set up environment variables as per the sample.env file.

4. Start the development server:

```
npm run dev
```

### Environment Variables Requirements for frontend Store

```
NEXT_PUBLIC_API_URL=
```

You'll get this value from the admin portal in the settings section.

## Contributing

We welcome contributions from the community! If you'd like to contribute to this project, please read our [Contributing Guidelines](CONTRIBUTING.md) for detailed information on how to get started, submit changes, and more.

Your contributions help make this project better for everyone. Thank you for your interest and support!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or need further clarification, please open an issue in this repository or contact our support team.
