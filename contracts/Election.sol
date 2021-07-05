pragma solidity >=0.4.21 <0.7.0;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Model a Voter
    struct Voter{
        uint voterId;
        uint aadharid;
        string name;
        uint age;
        address password;
        bool voted;
    }
     

    mapping(uint => Voter) public voters;
    mapping(address => bool) public voter;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;
    uint public actvote=0;
    uint public votersCount;
    bool public voteProcess =false;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    constructor () public {
        addCandidate("BJP");
        addCandidate("Congress");
        addCandidate("Aap");
        
    }

    function addCandidate (string memory _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function addVoter (uint _aadharid,string memory _name,uint _age,address _password)public {
        require(_age>=18);
        votersCount++;
        voters[votersCount]=Voter(votersCount,_aadharid,_name,_age,_password,false);
    }

    function vote (uint _candidateId,uint _voterId) public {
        // require that they haven't voted before
        require(!voters[_voterId].voted);
        // require election Activated
        require(voteProcess);
        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[_voterId].voted = true;
        voter[msg.sender]=true;
        //voting percentage
        actvote++;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
    
    //initialize voting process and termination
    function stopvoting() public{
        voteProcess=false;
    }
    
    function startvoting() public{
        voteProcess = true;  
    }
    
}