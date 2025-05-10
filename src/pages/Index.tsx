
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-hospital-600 to-hospital-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">Hospital Management System</h1>
              <p className="text-xl">
                A comprehensive solution for managing hospital operations, patients, and staff.
              </p>
              <Button 
                size="lg" 
                className="bg-white text-hospital-700 hover:bg-gray-100"
                onClick={() => navigate('/dashboard')}
              >
                Enter Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
              <div className="bg-white/10 rounded-lg p-8 backdrop-blur-sm border border-white/20 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-md p-4 text-center">
                    <h3 className="text-xl font-bold">Patients</h3>
                    <p className="text-3xl font-semibold mt-2">250+</p>
                  </div>
                  <div className="bg-white/10 rounded-md p-4 text-center">
                    <h3 className="text-xl font-bold">Doctors</h3>
                    <p className="text-3xl font-semibold mt-2">15+</p>
                  </div>
                  <div className="bg-white/10 rounded-md p-4 text-center">
                    <h3 className="text-xl font-bold">Departments</h3>
                    <p className="text-3xl font-semibold mt-2">8</p>
                  </div>
                  <div className="bg-white/10 rounded-md p-4 text-center">
                    <h3 className="text-xl font-bold">Beds</h3>
                    <p className="text-3xl font-semibold mt-2">100+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-hospital-100 text-hospital-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Patient Management</h3>
            <p className="text-gray-600">Efficiently manage patient information, medical history, and appointments.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-hospital-100 text-hospital-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Medical Records</h3>
            <p className="text-gray-600">Store and access patient medical records securely and efficiently.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-hospital-100 text-hospital-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Appointment Scheduling</h3>
            <p className="text-gray-600">Streamline the appointment scheduling process for patients and doctors.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="h-12 w-12 bg-hospital-100 text-hospital-600 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Billing Management</h3>
            <p className="text-gray-600">Handle billing and payment processing with ease and accuracy.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Access the hospital management system to start managing patients, appointments, and medical records.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="bg-hospital-600 hover:bg-hospital-700"
            >
              Go to Dashboard
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/patients')}
            >
              Manage Patients
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">Hospital Management System</h3>
              <p className="text-gray-400 max-w-md">
                A comprehensive healthcare management solution designed for modern hospitals.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Features</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Patient Management</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Doctor Profiles</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Appointments</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Medical Records</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">API Reference</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">User Guides</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Sales</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between">
            <p className="text-gray-400">© 2025 Hospital Management System. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
