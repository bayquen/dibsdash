'use client';    // NOTE: I originally added this line to tailor to user's local (machine) timezone

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        // Save host code to localStorage
        localStorage.setItem(`host_${result.data.url_slug}`, result.data.host_edit_code)
      

        // Redirect back to the event page
        router.push(`/event/${result.data.url_slug}`)
      } else {
        alert('Error creating event: ' + result.error)
      }
    } catch (error) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-sm mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4">Create Your Event</h1>
        
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-6 pt-5 pb-6 mb-3">
          <div className="mb-4">
            <label className="block text-md font-bold mb-2" htmlFor="name">
              Event Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g. Potluck Dinner Party"
              maxLength={50}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.name.length}/50 characters
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-md font-bold mb-2" htmlFor="description">
              Description <span className="text-sm text-gray-500">(optional)</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g. Come one, come all. Bring your best dishes!"
              rows={3}
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-bold mb-2" htmlFor="date">
              Date <span className="text-sm text-gray-500">(optional)</span>
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-bold mb-2" htmlFor="time">
              Time <span className="text-sm text-gray-500">(optional)</span>
            </label>
            <input
              id="time"
              name="time"
              type="time"
              value={formData.time}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="">
            <label className="block text-md font-bold mb-2" htmlFor="location">
              Location <span className="text-sm text-gray-500">(optional)</span>
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder=""
              maxLength={100}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 mb-2">
            {formData.location.length}/100 characters
          </p>
          
          <p className="text-md mt-1 mb-4 max-w-md mb-2">
            <span className="text-green-500 font-semibold">NOTE:</span> You can edit any of this info again later.
          </p>

          {/* Submit Button to create event */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={loading || !formData.name}
              className="custom-button min-h-[44px] min-w-[44px]"
            >
              <span className="custom-button-top"> {loading ? 'Creating...' : 'Create Event'} </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )

}
