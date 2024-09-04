/* eslint-disable no-unused-vars */
import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

// import { Button } from 'flowbite-react'
function Home() {
    return (
        <div>
            <Hero/>
            <LatestCollection/>
            <BestSeller/>
            <OurPolicy/>
            <NewsletterBox/>
       </div>
    )
}

export default Home
