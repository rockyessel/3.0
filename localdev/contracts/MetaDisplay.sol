// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MetaDisplay {
    struct Collections {
        string _id;
        address owner;
        string profile;
        string cover;
        string title;
        string description;
        string date;
        string category;
        string[] assetId;
    }

    struct Appreciator {
        address appreciator;
        string assetId;
        uint256 amountAppreciated;
        uint16 appreciationQuantity;
    }

    struct Assets {
        string _id;
        address owner;
        string title;
        string description;
        string image;
        string category;
        string date;
        Appreciator[] appreciators;
    }

    mapping(bytes32 => mapping(address => uint256))
    public assetAppreciatorIndex;
    mapping(bytes32 => Assets) public assets_display;
    mapping(bytes32 => Collections) public collections;
    uint256 public no_of_assets = 0;
    uint256 public no_of_appreciators = 0;
    uint256 public no_of_collections = 0;
    bytes32[] public assetIds;
    bytes32[] public collectionIds;

    event CollectionCreated(bytes32 indexed collectionId, address indexed owner, string title);

    event AssetAdded(bytes32 indexed collectionId, bytes32 indexed assetId);

    function createCollection(string memory _id, address _owner, string memory _profile, string memory _cover, string memory _title, string memory _description, string memory _date, string memory _category) public payable {
        // Generate a unique ID for the collection
        bytes32 collectionId = keccak256(abi.encodePacked(_id));

        // Create the collection object
        Collections memory collection = Collections({
            _id: _id,
            owner: _owner,
            profile: _profile,
            cover: _cover,
            title: _title,
            description: _description,
            date: _date,
            category: _category,
            assetId: new string[](0)
        });

        // Add the collection to the global collections mapping
        collections[collectionId] = collection;

        collectionIds.push(collectionId);
        no_of_collections++;

        // Emit a CollectionCreated event
        emit CollectionCreated(collectionId, _owner, _title);
    }

    function getCollectionById(string memory _id) public view returns (Collections memory) {
        bytes32 collectionId = keccak256(abi.encodePacked(_id));
        return collections[collectionId];
    }

    function addAssetToCollection(string memory _id, string memory _assetId) public {
         bytes32 collectionId = keccak256(abi.encodePacked(_id));
        // Get the collection from the global collections mapping
        Collections storage collection = collections[collectionId];

        // Add the asset ID to the collection's assetId array
        collection.assetId.push(_assetId);

        // Update the collection's assetId field
        collections[collectionId].assetId = collection.assetId;

        bytes32 assetId = keccak256(abi.encodePacked(_assetId));
        emit AssetAdded(collectionId, assetId);
        // Emit an AssetAdded event
        emit AssetAdded(collectionId, assetId);
    }

    function getAllCollections() public view returns (Collections[] memory) {
        Collections[] memory allCollections = new Collections[](
            no_of_collections
        );
        for (uint256 i = 0; i < no_of_collections; i++) {
            allCollections[i] = collections[collectionIds[i]];
        }
        return allCollections;
    }

    function deleteAssetById(string memory _id) public {
        bytes32 assetId = keccak256(bytes(_id));
        require(assetExists(assetId), "Asset does not exist");
        require(
            msg.sender == assets_display[assetId].owner,
            "Only the owner can delete this asset"
        );
        delete assets_display[assetId];
        for (uint256 i = 0; i < no_of_assets; i++) {
            if (assetIds[i] == assetId) {
                assetIds[i] = assetIds[no_of_assets - 1];
                assetIds.pop();
                no_of_assets--;
                break;
            }
        }
    }

    function deleteCollectionById(string memory _id) public {
        bytes32 collectionId = keccak256(bytes(_id));
        require(
            collections[collectionId].owner == msg.sender,
            "Only the owner can delete this collection"
        );
        delete collections[collectionId];
        for (uint256 i = 0; i < no_of_collections; i++) {
            if (collectionIds[i] == collectionId) {
                collectionIds[i] = collectionIds[no_of_collections - 1];
                collectionIds.pop();
                no_of_collections--;
                break;
            }
        }
    }

    function createAsset(string memory _id, string memory _title, string memory _description, string memory _image, string memory _category, string memory _date) public returns (string memory) {
        require(bytes(_id).length > 0, "ID cannot be empty");

        bytes32 assetId = keccak256(abi.encodePacked(_id));

        // Check if asset with this ID already exists
        require(
            assets_display[assetId].owner == address(0),
            "Asset with this ID already exists"
        );

        Assets storage asset = assets_display[assetId];
        asset._id = _id;
        asset.owner = msg.sender;
        asset.title = _title;
        asset.description = _description;
        asset.image = _image;
        asset.category = _category;
        asset.date = _date;

        assetIds.push(assetId);
        no_of_assets++;

        return _id;
    }

    function assetExists(bytes32 assetId) public view returns (bool) {
        return assets_display[assetId].owner != address(0);
    }

    function getAllAssets() public view returns (Assets[] memory) {
        Assets[] memory assets = new Assets[](no_of_assets);

        for (uint256 i = 0; i < no_of_assets; i++) {
            assets[i] = assets_display[assetIds[i]];
        }

        return assets;
    }

    function getAssetById(string memory _id) public view returns (Assets memory) {
        bytes32 key = keccak256(bytes(_id));
        Assets storage asset = assets_display[key];

        if (keccak256(bytes(asset._id)) == keccak256(bytes(_id))) {
            // Get the number of appreciators
            uint256 numAppreciators = asset.appreciators.length;

            // Initialize a new array to store the addresses of the appreciators
            address[] memory appreciatorAddresses = new address[](
                numAppreciators
            );

            // Loop through the appreciators and add their addresses to the array
            for (uint256 i = 0; i < numAppreciators; i++) {
                appreciatorAddresses[i] = asset.appreciators[i].appreciator;
            }

            // Return the asset without the appreciatorAddresses field
            return
                Assets({
                    _id: asset._id,
                    owner: asset.owner,
                    title: asset.title,
                    description: asset.description,
                    image: asset.image,
                    category: asset.category,
                    date: asset.date,
                    appreciators: asset.appreciators
                });
        } else {
            return
                Assets({
                    _id: "",
                    owner: address(0),
                    title: "",
                    description: "",
                    image: "",
                    category: "",
                    date: "",
                    appreciators: new Appreciator[](0)
                });
        }
    }

    function appreciateAssetById(address payable _receiver, string memory _assetId) public payable {
        bytes32 assetId = keccak256(abi.encodePacked(_assetId));
        Assets storage asset = assets_display[assetId];

        uint256 index = assetAppreciatorIndex[assetId][msg.sender];
        if (index == 0) {
            Appreciator memory newAppreciator = Appreciator(
                msg.sender,
                _assetId,
                msg.value,
                1
            );
            asset.appreciators.push(newAppreciator);
            assetAppreciatorIndex[assetId][msg.sender] = asset
                .appreciators
                .length;

            // Increment no_of_appreciators
            no_of_appreciators++;
        } else {
            asset.appreciators[index - 1].amountAppreciated += msg.value;
            asset.appreciators[index - 1].appreciationQuantity++;
        }

        (bool sent, ) = _receiver.call{value: msg.value}("");
        require(sent, "Ether transfer to asset owner failed.");
    }

    function getAppreciatorsByAssetId(string memory _id) public view returns (Appreciator[] memory) {
        bytes32 assetId = keccak256(abi.encodePacked(_id));
        Assets storage asset = assets_display[assetId];

        return asset.appreciators;
    }

    function getAllAppreciators() public view returns (Appreciator[] memory) {
        Appreciator[] memory allAppreciators = new Appreciator[](
            no_of_appreciators
        );
        uint256 currentIndex = 0;

        // Loop through all the assets
        for (uint256 i = 0; i < assetIds.length; i++) {
            bytes32 assetId = assetIds[i];
            Assets storage asset = assets_display[assetId];

            // Loop through all the appreciators for this asset
            for (uint256 j = 0; j < asset.appreciators.length; j++) {
                allAppreciators[currentIndex] = asset.appreciators[j];
                currentIndex++;
            }
        }

        return allAppreciators;
    }
}