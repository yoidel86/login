<?php
/**
 * Created by PhpStorm.
 * User: saul
 * Date: 11/2/2017
 * Time: 4:48 PM
 */
//service_user
namespace Entities;

/**
 * @Entity
 * @Table(name="service_user")
 */
class UserService
{
    /**
    * Many Features have One Product.
    * @Id @ManyToOne(targetEntity="User", inversedBy="userservices")
     */
    private $user;

    /**
     * Many Features have One Product.
     * @Id @ManyToOne(targetEntity="Service", inversedBy="serviceusers")
     */
    private $service;

    /**
     * @Column(type="integer")
     * @var int
     **/
    protected $favorite;

    /**
     * @Column(type="integer")
     * @var int
     **/
    protected $rate;

    /**
     * @Column(type="integer")
     * @var int
     **/
    protected $contacted;

    /**
     * @Column(type="string")
     * @var string
     **/
    protected $complaint;

    /**
     * @Column(type="datetime")
     **/
    protected $complaint_created;
    /**
     * Set favorite
     *
     * @param integer $favorite
     *
     * @return UserService
     */
    public function setFavorite($favorite)
    {
        $this->favorite = $favorite;

        return $this;
    }

    /**
     * Get favorite
     *
     * @return integer
     */
    public function getFavorite()
    {
        return $this->favorite;
    }

    /**
     * Set rate
     *
     * @param integer $rate
     *
     * @return UserService
     */
    public function setRate($rate)
    {
        $this->rate = $rate;

        return $this;
    }

    /**
     * Get rate
     *
     * @return integer
     */
    public function getRate()
    {
        return $this->rate;
    }

    /**
     * Set contacted
     *
     * @param integer $contacted
     *
     * @return UserService
     */
    public function setContacted($contacted)
    {
        $this->contacted = $contacted;

        return $this;
    }

    /**
     * Get contacted
     *
     * @return integer
     */
    public function getContacted()
    {
        return $this->contacted;
    }

    /**
     * Set complaint
     *
     * @param string $complaint
     *
     * @return UserService
     */
    public function setComplaint($complaint)
    {
        $this->complaint = $complaint;

        return $this;
    }

    /**
     * Get complaint
     *
     * @return string
     */
    public function getComplaint()
    {
        return $this->complaint;
    }

    /**
     * Set complaintCreated
     *
     * @param \DateTime $complaintCreated
     *
     * @return UserService
     */
    public function setComplaintCreated($complaintCreated)
    {
        $this->complaint_created = $complaintCreated;

        return $this;
    }

    /**
     * Get complaintCreated
     *
     * @return \DateTime
     */
    public function getComplaintCreated()
    {
        return $this->complaint_created;
    }

    /**
     * Set user
     *
     * @param \Entities\User $user
     *
     * @return UserService
     */
    public function setUser(\Entities\User $user)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return \Entities\User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Set service
     *
     * @param \Entities\Service $service
     *
     * @return UserService
     */
    public function setService(\Entities\Service $service)
    {
        $this->service = $service;

        return $this;
    }

    /**
     * Get service
     *
     * @return \Entities\Service
     */
    public function getService()
    {
        return $this->service;
    }
}