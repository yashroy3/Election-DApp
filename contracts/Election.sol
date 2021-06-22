pragma solidity 0.4.25;

contract Election {
    // Model a Candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }
     bool voteprocess =true;
     bool votep = false;
     

    // Store accounts that have voted
    mapping(address => bool) public voters;
    // Store Candidates
    // Fetch Candidate
    mapping(uint => Candidate) public candidates;
    // Store Candidates Count
    uint public candidatesCount;
    uint public actvote=0;
    uint public regvote=6;
    uint public votepercent;

    // voted event
    event votedEvent (
        uint indexed _candidateId
    );

    constructor () public {
        addCandidate("BJP");
        addCandidate("Congress");
        addCandidate("Aap");
        
    }

    function addCandidate (string _name) private {
        candidatesCount ++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote (uint _candidateId) public {
        // require that they haven't voted before
        require(!voters[msg.sender]);
        require(voteprocess);
        require(votep);
        // require a valid candidate
        require(_candidateId > 0 && _candidateId <= candidatesCount);

        // record that voter has voted
        voters[msg.sender] = true;
        //voting percentage
        actvote++;

        // update candidate vote Count
        candidates[_candidateId].voteCount ++;

        // trigger voted event
        emit votedEvent(_candidateId);
    }
    function votepercentage() public{

        votepercent = actvote*100;
        votepercent = votepercent/regvote;
        
        
    }
    //initialize voting process and termination
    function stopvoting() public{
        voteprocess=false;
    }
    
    function startvoting() public{
        votep = true;  
        }
    
}
