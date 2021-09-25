import React, { useEffect } from 'react';
import styles from './HowItWorks.module.sass';
import Header from '../../components/Header/Header';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';
import CollapseItem from './CollapseItem/CollapseItem';
import Footer from '../../components/Footer/Footer';

const HowItWorks = (props) => {

    useEffect(() =>{
        Events.scrollEvent.register('begin', function(to, element) {
            console.log('begin', arguments);
        });

        Events.scrollEvent.register('end', function(to, element) {
            console.log('end', arguments);
        });

        scrollSpy.update();

        return () =>{
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        }
    },[])

    return(
        <>
            <Header/>
            
            <div className = {styles.main}>
                <div className = {styles.wrap} style={{paddingTop: 4 + 'rem', paddingBottom: 4 + 'rem'}}> 
                    <div className = {styles.howDoesSquadhelpWork}>
                        <div className = {styles.leftContainer}>
                            <span>World's #1 Naming Platform</span>
                            <div>
                                <h1>How Does Squadhelp Work?</h1>
                                <p>Squadhelp helps you come up with a great name for your business by combining the power of crowdsourcing with sophisticated technology and Agency-level validation services.</p>
                            </div>
                            <div className = {styles.howItWorksButton}>
                                <a>
                                    <small class="fas fa-play"></small>
                                    Play Video
                                </a>
                            </div>
                        </div>
                        <div className = {styles.rightContainer}>
                            <img src = "https://i.imgur.com/aKc9D6P.png"></img>
                        </div>
                    </div>
                    <div className = {styles.servicesContainer}>
                        <div className = {styles.sectionHeader}>
                            <span>Our Services</span>
                            <h1>3 Ways To Use Squadhelp</h1>
                            <p>Squadhelp offers 3 ways to get you a perfect name for your business.</p>
                        </div>
                        <div className = {styles.cardDeck}>
                            <div className = {styles.cardBody}>
                                <div className = {styles.cardInfo}>
                                    <img src="https://i.imgur.com/yxmXAF0.png"></img>
                                    <h3>Launch a Contest</h3>
                                    <p>Work with hundreds of creative experts to get custom name suggestions for your business or brand. All names are auto-checked for URL availability.</p>
                                </div>
                                <div className = {styles.howItWorksButton}>
                                    <a>
                                        <small class="fas fa-play"></small>
                                        Launch a Contest
                                    </a>
                                </div>
                            </div>
                            <div className = {styles.cardBody}>
                                <div className = {styles.cardInfo}>
                                    <img src="https://i.imgur.com/ecc1BPM.png"></img>
                                    <h3>Explore Names For Sale</h3>
                                    <p>Our branding team has curated thousands of pre-made names that you can purchase instantly. All names include a matching URL and a complimentary Logo Design</p>
                                </div>
                                <div className = {styles.howItWorksButton}>
                                    <a>
                                        <small class="fas fa-play"></small>
                                        Explore Names For Sale
                                    </a>
                                </div>
                            </div>
                            <div className = {styles.cardBody}>
                                <div className = {styles.cardInfo}>
                                    <img src="https://i.imgur.com/ndxBA1a.png"></img>
                                    <h3>Agency-level Managed Contests</h3>
                                    <p>Our Managed contests combine the power of crowdsourcing with the rich experience of our branding consultants. Get a complete agency-level experience at a fraction of Agency costs</p>
                                </div>
                                <div className = {styles.howItWorksButton}>
                                    <a>
                                        <small class="fas fa-play"></small>
                                        Learn More
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className = {styles.wrap} style = {{paddingBottom: 8 + 'rem', paddingTop: 8 + 'rem'}}>
                    <div className = {styles.sectionHeader}>
                        <img src = "https://i.imgur.com/VdyPA62.png"></img>
                        <h1>How Do Naming Contests Work?</h1>
                    </div>
                    <div className = {styles.howDoNamingContestsWorkContainer}>
                        <div className = {styles.howDoNamingContestsWorkImg}>
                            <img src = "https://i.imgur.com/YqgWDK0.jpeg"></img>
                        </div>
                        <div className = {styles.howDoNamingContestsWorkInfo}>
                            <ul>
                                <li className = {styles.listItem} >
                                    <div className = {styles.listItemWrapper}>
                                        <div className = {styles.numberOfItem}>
                                            1.
                                        </div>
                                        <div className = {styles.listItemInfo}>
                                            Fill out your Naming Brief and begin receiving name ideas in minutes
                                        </div> 
                                    </div>
                                </li>
                                <li className = {styles.listItem}>
                                    <div className = {styles.listItemWrapper}>
                                        <div className = {styles.numberOfItem}>
                                            2.
                                        </div>
                                        <div className = {styles.listItemInfo}>
                                            Rate the submissions and provide feedback to creatives. Creatives submit even more names based on your feedback.
                                        </div> 
                                    </div>
                                </li>
                                <li className = {styles.listItem}>
                                    <div className = {styles.listItemWrapper}>
                                        <div className = {styles.numberOfItem}>
                                            3.
                                        </div>
                                        <div className = {styles.listItemInfo}>
                                            Our team helps you test your favorite names with your target audience. We also assist with Trademark screening.
                                        </div> 
                                    </div>
                                </li>
                                <li className = {styles.listItem}>
                                    <div className = {styles.listItemWrapper}>
                                        <div className = {styles.numberOfItem}>
                                            4.
                                        </div>
                                        <div className = {styles.listItemInfo}>    
                                            Pick a Winner. The winner gets paid for their submission.
                                        </div> 
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className = {styles.wrap } style = {{paddingTop: 4 + 'rem', paddingBottom: 4 + 'rem'}}>
                    <div className = {styles.sticky}>
                        <div className = {styles.stickyBlock}>
                            <ul>
                                <li><Link to="launching-a-contest" spy={true} smooth={true} duration={500} >Launching A Contest</Link></li>
                                <li><Link to="buying-from-marketplace" spy={true} smooth={true} duration={500} >Buying From Marketplace</Link></li>
                                <li><Link to="managed-contests" spy={true} smooth={true} duration={500} >Managed Contests</Link></li>
                                <li><Link to="for-creatives" spy={true} smooth={true} duration={500} >For Creatives</Link></li>
                            </ul>
                        </div>
                        <div className = {styles.stickyInfo}>
                            <div className = {styles.stickyInfoBlock} name = "launching-a-contest">
                                <h2>Launching A Contest</h2>
                                <CollapseItem 
                                    contentText = 'For Naming contests, you will start receiving your submissions within few minutes of launching your contest. Since our creatives are located across the globe, you can expect to receive submissions 24 X 7 throughout the duration of the brainstorming phase .'
                                    buttonText = 'How long does it take to start receiving submissions?'
                                />
                                <CollapseItem 
                                    contentText = 'You can choose a duration from 1 day to 7 days. We recommend a duration of 3 Days or 5 Days. This allows for sufficient time for entry submission as well as brainstorming with creatives. If you take advantage of our validation services such as Audience Testing and Trademark Research, both will be an additional 4-7 days (3-5 business days for Audience Testing and 1-2 business days for Trademark Research).'
                                    buttonText = 'How long do Naming Contests last?'
                                />
                                <CollapseItem 
                                    contentText = 'About 70% of our Creatives are located in the United States and other English speaking countries (i.e. United Kingdom, Canada, and Australia.). We utilize an advanced rating score algorithm to ensure that high quality creatives receive more opportunities to participate in our contests.'
                                    buttonText = 'Where are the creatives located?'
                                />
                                <CollapseItem 
                                    contentText = {
                                        <>
                                            While it is unusually rare that you will not like any names provided, we have a few options in case this problem occurs:
                                            <br/>
                                            <ul>
                                                <li> If the contest ends and you have not yet found a name that you’d like to move forward with, we can provide complimentary extension of your contest as well as a complimentary consultation with one of our branding consultants (a $99 value). </li>
                                                <li> By exploring our premium domain marketplace you can apply the contest award towards the purchase of any name listed for sale. </li>
                                                <li> If you choose the Gold package or Platinum package and keep the contest as "Not Guaranteed", you can request a partial refund if you choose not to move forward with any name from you project. (Please note that the refund is for the contest award). Here is a link to our <a href="google.com" target="_blank">Refund Policy</a></li>
                                            </ul>
                                        </>
                                    }
                                    buttonText = 'What if I do not like any submissions?'
                                />
                                <CollapseItem 
                                    contentText = {
                                        <>
                                            Our naming competitions start at $299, and our logo design competitions start at $299. Also, there are three additional contest level that each offer more features and benefits. See our <a href="google.com">Pricing Page</a> for details
                                        </>
                                    }
                                    buttonText = 'How much does it coast'
                                />
                                <CollapseItem 
                                    contentText = {
                                        <>
                                            Yes! We have many contest bundles - our most popular being our Name, Tagline, and Logo bundle. Bundles allow you to purchase multiple contests at one time and save as much as from $75 - $400. You can learn more about our bundle options on our <a href="google.com">Pricing Page</a>.
                                        </>
                                    }
                                    buttonText = 'I need both a Name and a Logo. Do you offer any discount for multiple contests?'
                                />
                                <CollapseItem 
                                    contentText = 'Absolutely. Squadhelp services organizations across the globe. Our customer come from many countries, such as the United States, Australia, Canada, Europe, India, and MENA. We’ve helped more than 25,000 customer around the world.'
                                    buttonText = 'Can you serve customers outside the US?'
                                />
                                <CollapseItem 
                                    contentText = 'You can select a Non Disclosure Agreement (NDA) option at the time of launching your competition. This will ensure that only those contestants who agree to the NDA will be able to read your project brief and participate in the contest. The contest details will be kept private from other users, as well as search engines.'
                                    buttonText = 'What if I want to keep my business idea private?'
                                />
                                <CollapseItem 
                                    contentText = {
                                        <>
                                            Our creatives have submitted more than 6 Million names and thousands of logos on our platform. Here are some examples of Names, Taglines, and Logos that were submitted in recent contests.
                                            <br/>
                                            <ul>
                                                <li><a href="google.com">Name Examples</a></li>
                                                <li><a href="google.com">Tagline Examples</a></li>
                                                <li><a href="google.com">Logo Examples</a></li>
                                             </ul>
                                        </>
                                    }
                                    buttonText = 'Can I see any examples?'
                                />
                            </div>
                            <div className = {styles.stickyInfoBlock} name = "buying-from-marketplace">
                                <h2>Buying From Marketplace</h2>
                                <CollapseItem 
                                    contentText = 'When you purchase a domain from our premium domain marketplace, you will receive the exact match .com URL, a complimentary logo design (along with all source files), as well as a complimentary Trademark report and Audience Testing if you’re interested in validating your name.'
                                    buttonText = 'Whats included with a Domain Purchase?'
                                />
                                <CollapseItem 
                                    contentText = 'Once you purchase a Domain, our transfer specialists will reach out to you (typically on the same business day). In most cases we can transfer the domain to your preferred registrar (such as GoDaddy). Once we confirm the transfer details with you, the transfers are typically initiated to your account within 1 business day.'
                                    buttonText = 'How does the Domain transfer process work?'
                                />
                                <CollapseItem 
                                    contentText = 'We offer payment plans for many domains in our Marketplace. If you purchase a domain on a payment plan, we hold the domain in an Escrow account until it is fully paid off. However our team can assist you with making any changes to the domains (such as Nameserver changes), so that you can start using the domain right away after making your first installment payment.'
                                    buttonText = 'If I purchase a Domain on installments, can I start using it to setup my website?'
                                />
                            </div>
                            <div className = {styles.stickyInfoBlock} name = "managed-contests">
                                <h2>Managed Contests</h2>
                                <CollapseItem 
                                    contentText = {
                                        <>
                                            The 'Managed' option is a fully managed service by Squadhelp Branding experts. It includes a formal brief preparation by Squadhelp team and management of your contest. Managed Contests are a great fit for companies that are looking for an "Agency" like experience and they do not want to manage the contest directly.Our branding team has directly managed hundreds of branding projects and has learned several best practices that lead to successful project outcomes. Our team will apply all best practices towards the management of your branding project.Learn more about our <a href="google.com">Managed Contest Service</a>
                                        </>
                                    }
                                    buttonText = 'What are Managed Contests?'
                                />
                                <CollapseItem 
                                    contentText = {
                                        <>
                                            <ul>
                                                <li>The Managed projects start with a project kick-off call with your Branding Consultant. You can schedule this call online immediately after making your payment. </li>
                                                <li>After your kick-off call, the Branding consultant will write your project brief and send for your approval within 1 business day.</li>
                                                <li>Upon your approval, the contest will go live. The branding consultant will help manage your project throughout the brainstorming phase (typically 5 days). </li>
                                                <li>Upon the completion of brainstorming phase, the branding consultant will work with you to test the top 6 names from your Shortlist (3-5 Days). In addition, the branding consultant will coordinate the detailed Trademark screening (1-3 days)</li>
                                            </ul>
                                        </>
                                    }
                                    buttonText = 'Whats a typical timeline for a Managed Contest?'
                                />
                                <CollapseItem 
                                    contentText = {
                                        <>
                                            <ul>
                                                <li>(1) a $500 award amount (instead of $300), which will attract our top Creatives and provide more options to choose from; </li>
                                                <li>(2) we will ensure a senior member of our branding team is assigned to your project and the branding team will invest about 3X more time in the day-to-day management of your project;</li>
                                                <li> (3) you will receive more high-end trademark report and 5X more responses for your audience test. </li>
                                                <li>Here is a link to our <a href="google.com" target="_blank">Pricing page</a> with a detailed comparison of the two packages.</li>
                                            </ul>
                                        </>
                                    }
                                    buttonText = 'How much do Managed Contests cost?'
                                />
                                <CollapseItem 
                                    contentText = 'All our branding consultants are based in in our Headquarters (Hoffman Estates, IL). Our branding consultants have many years of experience in managing hundreds of branding projects for companies ranging from early stage startups to Fortune 500 corporations.'
                                    buttonText = 'Where are the Branding Consultants located?'
                                />
                            </div>
                            <div className = {styles.stickyInfoBlock} name = "for-creatives">
                                <h2>For Creatives</h2>
                                <CollapseItem 
                                    contentText = {
                                        <>
                                            We are open to anyone to signup. However, we have an extensive "<a href="http://www.google.com">Quality Scoring</a>" process which ensures that high quality creatives have the ability to continue to participate in the platform. On the other hand, we limit the participation from those creatives who do not consistently receive high ratings.
                                        </>    
                                    }
                                    buttonText = 'Can anyone join your platform?'
                                />
                                 <CollapseItem 
                                    contentText = 'When you initially signup, you are assigned few contests to assess your overall quality of submissions. Based upon the quality of your submissions, you will continue to be assigned additional contests. Once you have received enough high ratings on your submissions, your account will be upgraded to "Full Access", so that you can begin participating in all open contests.'
                                    buttonText = 'Can I start participating immediately upon signing up?'
                                />
                                 <CollapseItem 
                                    contentText = 'We handle creative payouts via Paypal or Payoneer. Depending upon your country of residence, we may require additional documentation to verify your identity as well as your Tax status.'
                                    buttonText = 'How Do I Get Paid?'
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className = {styles.readyToGetContest}>
                    <h2>Ready to get started?</h2>
                    <p>Fill out your contest brief and begin receiving custom name suggestions within minutes.</p>
                    <button>Start A Contest</button>
                </div>
                <div className = {styles.wrap} style = {{paddingTop: 4 + 'rem', paddingBottom: 4 + 'rem'}}>
                    <div className = {styles.statsContainer}>
                        <div className = {styles.statsItem}>
                            <img src = "https://www.squadhelp.com/resources/assets/imgs/front/stars.svg"/>
                            <p><strong>4.9 out of 5 stars</strong> from 25,000+ customers.</p>
                        </div>
                        <div className = {styles.statsItem}>
                            <img src = "https://www.squadhelp.com/resources/assets/imgs/front/img2(1).png"/>
                            <p>Our branding community stands <strong>200,000+</strong> strong.</p>
                        </div>
                        <div className = {styles.statsItem}>
                            <img src = "https://www.squadhelp.com/resources/assets/imgs/front/sharing-files.svg"/>
                            <p><strong>140+ Industries</strong> supported across more than <strong>85 countries</strong> – and counting.</p>
                        </div>
                    </div>
                </div>
                <div className = {styles.wrap} style = {{paddingTop: 4 + 'rem', paddingBottom: 4 + 'rem'}}>
                    <div className = {styles.featuredIn}>
                        <div className = {styles.featuredInItem}>
                            <h2>Featured in</h2>
                        </div>
                        <div className = {styles.featuredInItem}>
                            <img src="https://www.squadhelp.com/resources/assets/imgs/front/forbes.svg"/>
                        </div>
                        <div className = {styles.featuredInItem}>
                            <img src="https://www.squadhelp.com/resources/assets/imgs/front/TNW.svg"/>
                        </div>
                        <div className = {styles.featuredInItem}>
                            <img src="https://www.squadhelp.com/resources/assets/imgs/front/chicago.svg"/>
                        </div>
                        <div className = {styles.featuredInItem}>
                            <img src="https://www.squadhelp.com/resources/assets/imgs/front/Mashable.svg"/>
                        </div>
                    </div>
                </div>
            </div> 
            <Footer/>
        </>
    )
};


export default HowItWorks;
  