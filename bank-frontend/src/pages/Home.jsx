import React from 'react'

// Importing images for branding and feature icons
import logo from '../assets/img/argentBankLogo.png'
import chat from '../assets/img/icon-chat.png'
import money from '../assets/img/icon-money.png'
import security from '../assets/img/icon-security.png'

/**
 * Home component that displays the main landing page for Argent Bank.
 *
 * It features a promotional section highlighting key benefits,
 * followed by a section showcasing the bank's main features.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
const Home = () => {
  return (
    <div>
      {/* Hero section displaying promotional content */}
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>{' '}
          {/* Screen reader only text for accessibility */}
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>

      {/* Features section highlighting key offerings */}
      <section className="features">
        <h2 className="sr-only">Features</h2>{' '}
        {/* Screen reader only text for accessibility */}
        {/* Feature item: Customer priority */}
        <div className="feature-item">
          <img
            src={chat}
            alt="Chat Icon" // Alt text for accessibility
            className="feature-icon"
          />
          <h3 className="feature-item-title">You are our #1 priority</h3>
          <p>
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </p>
        </div>
        {/* Feature item: Savings and interest rates */}
        <div className="feature-item">
          <img
            src={money}
            alt="Money Icon" // Alt text for accessibility
            className="feature-icon"
          />
          <h3 className="feature-item-title">
            More savings means higher rates
          </h3>
          <p>
            The more you save with us, the higher your interest rate will be!
          </p>
        </div>
        {/* Feature item: Security */}
        <div className="feature-item">
          <img
            src={security}
            alt="Security Icon" // Alt text for accessibility
            className="feature-icon"
          />
          <h3 className="feature-item-title">Security you can trust</h3>
          <p>
            We use top of the line encryption to make sure your data and money
            is always safe.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home
