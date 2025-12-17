import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { getImageUrl } from '../utils/constants';
import { FiCalendar, FiMapPin, FiUsers, FiEdit, FiTrash2 } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('attending');
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserEvents();
  }, [activeTab]);

  const fetchUserEvents = async () => {
    try {
      setLoading(true);
      if (activeTab === 'attending') {
        const response = await api.get('/rsvp/user');
        setAttendingEvents(response.data);
      } else {
        const response = await api.get('/rsvp/user/created');
        setCreatedEvents(response.data);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    try {
      await api.delete(`/events/${eventId}`);
      fetchUserEvents();
    } catch (error) {
      alert('Failed to delete event');
      console.error('Error deleting event:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const events = activeTab === 'attending' ? attendingEvents : createdEvents;

  return (
    <div className="dashboard">
      <div className="container">
        <h1>My Dashboard</h1>
        <p className="dashboard-subtitle">Welcome back, {user?.name}!</p>

        <div className="dashboard-tabs">
          <button
            className={`tab-btn ${activeTab === 'attending' ? 'active' : ''}`}
            onClick={() => setActiveTab('attending')}
          >
            Events I'm Attending
          </button>
          <button
            className={`tab-btn ${activeTab === 'created' ? 'active' : ''}`}
            onClick={() => setActiveTab('created')}
          >
            Events I Created
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : events.length === 0 ? (
          <div className="no-events">
            <p>No {activeTab === 'attending' ? 'events you\'re attending' : 'events created'} yet.</p>
            {activeTab === 'created' && (
              <Link to="/events/create" className="btn btn-primary">
                Create Your First Event
              </Link>
            )}
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id || event._id} className="event-card card">
                {event.image && (
                  <img 
                    src={getImageUrl(event.image)} 
                    alt={event.title}
                    className="card-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                <div className="card-body">
                  <h3 className="card-title">{event.title}</h3>
                  <p className="card-text">
                    {event.description.length > 150
                      ? `${event.description.substring(0, 150)}...`
                      : event.description}
                  </p>
                  <div className="card-meta">
                    <span>
                      <FiCalendar /> {formatDate(event.date)}
                    </span>
                    <span>
                      <FiMapPin /> {event.location}
                    </span>
                    <span>
                      <FiUsers /> {event.attendeesCount || event.attendees?.length || 0} / {event.capacity}
                    </span>
                  </div>
                  <div className="card-actions">
                    <Link to={`/events/${event.id || event._id}`} className="btn btn-primary">
                      View Details
                    </Link>
                    {activeTab === 'created' && (
                      <>
                        <Link to={`/events/${event.id || event._id}/edit`} className="btn btn-secondary">
                          <FiEdit /> Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(event.id || event._id)}
                          className="btn btn-danger"
                        >
                          <FiTrash2 /> Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

