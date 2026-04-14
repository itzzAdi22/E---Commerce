import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-light text-center text-lg-start mt-4">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">E-Commerce Platform</h5>
            <p>
              A full-featured e-commerce application built with the MERN stack.
              Shop with confidence using our secure payment system and fast delivery.
            </p>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="#!" className="text-dark">About Us</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Contact</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Privacy Policy</a>
              </li>
              <li>
                <a href="#!" className="text-dark">Terms of Service</a>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contact</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <i className="fas fa-home me-3"></i> New York, NY 10012, US
              </li>
              <li>
                <i className="fas fa-envelope me-3"></i> info@example.com
              </li>
              <li>
                <i className="fas fa-phone me-3"></i> + 01 234 567 88
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2024 Copyright: E-Commerce Platform
      </div>
    </footer>
  );
};

export default Footer;
