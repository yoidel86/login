<?php
namespace Entities;

/**
 * @Entity
 * @Table(name="services")
 */
class Service
{
    /**
     * @Id @GeneratedValue @Column(type="integer")
     * @var int
     **/
    protected $id;

    /**
     * @Column(type="string")
     * @var string
     **/
    protected $title;

    /**
     * @Column(type="string")
     * @var string
     **/
    protected $subtitle;

    /**
     * @Column(type="string")
     * @var string
     **/
    protected $phone;


    /**
     * @Column(type="string")
     * @var string
     **/
    protected $address;

    /**
     * @Column(type="string")
     * @var string
     **/
    protected $other_phone;

    /**
     * @Column(type="string")
     * @var string
     **/
    protected $email;

    /**
     * @Column(type="string")
     * @var string
     **/
    protected $url;
    /**
     * @Column(type="string")
     * @var string
     **/
    protected $week_days;

    /**
     * @Column(type="string")
     * @var string
     **/
    protected $start_time;

    /**
     * @Column(type="string")
     * @var string
     **/
    protected $end_time;

    /**
     * @Column(type="integer")
     * @var integer
     **/
    protected $visits;
    /**
     * @Column(type="datetime")
     **/
    protected $created;


    //// relaciones
    /**
     * @ManyToOne(targetEntity="User", inversedBy="services")
     */
    private $author;

    /**
     * Bidirectional - One-To-Many (INVERSE SIDE)
     *
     * @OneToMany(targetEntity="Position", mappedBy="service")
     */
    private $positions;

    /**
     * Many services have Many cities.
     * @ManyToMany(targetEntity="City", inversedBy="services")
     * @JoinTable(name="service_city")
     */
    private $cities;

    /**
     * Many services have Many cities.
     * @ManyToMany(targetEntity="Subcategory", inversedBy="services")
     * @JoinTable(name="subcategory_service")
     */
    private $subcategories;

//    /**
//     * Many services have Many Users.
//     * @ManyToMany(targetEntity="User", mappedBy="services")
//     */
//    private $users;

    /**
     * One User has Many UserService.
     * @OneToMany(targetEntity="UserService", mappedBy="service")
     */
    private $serviceusers;

    /**
     * One User has Many UserService.
     * @OneToMany(targetEntity="Comments", mappedBy="service")
     */
    private $servicecomments;
    public function __construct()
    {
        $this->created = new \DateTime("now");
        $this->positions = new \Doctrine\Common\Collections\ArrayCollection();
        $this->cities = new \Doctrine\Common\Collections\ArrayCollection();
        $this->subcategories = new \Doctrine\Common\Collections\ArrayCollection();
        $this->serviceusers = new \Doctrine\Common\Collections\ArrayCollection();
        $this->servicecomments = new \Doctrine\Common\Collections\ArrayCollection();
    }

    public function getId()
    {
        return $this->id;
    }

    public function getUsername()
    {
        return $this->username;
    }

    public function setUsername($username)
    {
        $this->username = $username;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function setPassword($password)
    {
        $this->password = $password;
    }
    public function getAuthor()
    {
        return $this->author;
    }

    public function setAthor($author)
    {
        $this->author = $author;
    }
    public function getCreated()
    {
        return $this->created;
    }
    /**
     * Set phone
     *
     * @param string $phone
     *
     * @return Service
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone
     *
     * @return string
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set address
     *
     * @param string $address
     *
     * @return Service
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address
     *
     * @return string
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set otherPhone
     *
     * @param string $otherPhone
     *
     * @return Service
     */
    public function setOtherPhone($otherPhone)
    {
        $this->other_phone = $otherPhone;

        return $this;
    }

    /**
     * Get otherPhone
     *
     * @return string
     */
    public function getOtherPhone()
    {
        return $this->other_phone;
    }

    /**
     * Set url
     *
     * @param string $url
     *
     * @return Service
     */
    public function setUrl($url)
    {
        $this->url = $url;

        return $this;
    }

    /**
     * Get url
     *
     * @return string
     */
    public function getUrl()
    {
        return $this->url;
    }

    /**
     * Set weekDays
     *
     * @param string $weekDays
     *
     * @return Service
     */
    public function setWeekDays($weekDays)
    {
        $this->week_days = $weekDays;

        return $this;
    }

    /**
     * Get weekDays
     *
     * @return string
     */
    public function getWeekDays()
    {
        return $this->week_days;
    }

    /**
     * Set startTime
     *
     * @param string $startTime
     *
     * @return Service
     */
    public function setStartTime($startTime)
    {
        $this->start_time = $startTime;

        return $this;
    }

    /**
     * Get startTime
     *
     * @return string
     */
    public function getStartTime()
    {
        return $this->start_time;
    }

    /**
     * Set endTime
     *
     * @param string $endTime
     *
     * @return Service
     */
    public function setEndTime($endTime)
    {
        $this->end_time = $endTime;

        return $this;
    }

    /**
     * Get endTime
     *
     * @return string
     */
    public function getEndTime()
    {
        return $this->end_time;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     *
     * @return Service
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }


    /**
     * Set author
     *
     * @param \Entities\User $author
     *
     * @return Service
     */
    public function setAuthor(\Entities\User $author = null)
    {
        $this->author = $author;

        return $this;
    }

    /**
     * Add position
     *
     * @param \Entities\Service $position
     *
     * @return Service
     */
    public function addPosition(\Entities\Service $position)
    {
        $this->positions[] = $position;

        return $this;
    }

    /**
     * Remove position
     *
     * @param \Entities\Service $position
     */
    public function removePosition(\Entities\Service $position)
    {
        $this->positions->removeElement($position);
    }

    /**
     * Get positions
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getPositions()
    {
        return $this->positions;
    }

    /**
     * Add city
     *
     * @param \Entities\City $city
     *
     * @return Service
     */
    public function addCity(\Entities\City $city)
    {
        $this->cities[] = $city;

        return $this;
    }

    /**
     * Remove city
     *
     * @param \Entities\City $city
     */
    public function removeCity(\Entities\City $city)
    {
        $this->cities->removeElement($city);
    }

    /**
     * Get cities
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getCities()
    {
        return $this->cities;
    }

    /**
     * Add serviceuser
     *
     * @param \Entities\UserService $serviceuser
     *
     * @return Service
     */
    public function addServiceuser(\Entities\UserService $serviceuser)
    {
        $this->serviceusers[] = $serviceuser;

        return $this;
    }

    /**
     * Remove serviceuser
     *
     * @param \Entities\UserService $serviceuser
     */
    public function removeServiceuser(\Entities\UserService $serviceuser)
    {
        $this->serviceusers->removeElement($serviceuser);
    }

    /**
     * Get serviceusers
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getServiceusers()
    {
        return $this->serviceusers;
    }
}