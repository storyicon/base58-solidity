// This is an example test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// We use `loadFixture` to share common setups (or fixtures) between tests.
// Using this simplifies your tests and makes them run faster, by taking
// advantage of Hardhat Network's snapshot functionality.
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

// `describe` is a Mocha function that allows you to organize your tests.
// Having your tests organized makes debugging them easier. All Mocha
// functions are available in the global scope.
//
// `describe` receives the name of a section of your test suite, and a
// callback. The callback must define the tests of that section. This callback
// can't be an async function.
describe("Base58", function () {
    // We define a fixture to reuse the same setup in every test. We use
    // loadFixture to run this setup once, snapshot that state, and reset Hardhat
    // Network to that snapshopt in every test.
    async function deployBase58() {
        // Get the ContractFactory and Signers here.
        const contractFactory = await ethers.getContractFactory(
            "contracts/Base58.sol:Base58"
        );
        const [owner] = await ethers.getSigners();

        // To deploy our contract, we just have to call Token.deploy() and await
        // its deployed() method, which happens onces its transaction has been
        // mined.
        const contract = await contractFactory.deploy();

        await contract.deployed();

        // Fixtures can return anything you consider useful for your tests
        return { contractFactory, contract, owner };
    }

    // You can nest describe calls to create subsections.
    describe("Encode/Decode", function () {
        const testCases = [
            {
                input: "0x52fdfc072182654f163f5f0f9a621d729566c74d10037c4d7bbb0407d1e2c649",
                output: "6ay4GfhR9RgN28d5ufg63toPetkYHGcpcW7G3b7QWSek",
            },
            {
                input: "0x81855ad8681d0d86d1e91e00167939cb6694d2c422acd208a0072939487f6999",
                output: "9ibXu6v4uTwLEcME5vyHev6Zi8LpxqiWTe1dahKpAbb6",
            },
            {
                input: "0xeb9d18a44784045d87f3c67cf22746e995af5a25367951baa2ff6cd471c483f1",
                output: "GrjkFXxhyRFksykTSGRrE3ZqRpWpB2W6RPPq2xCTjAsA",
            },
            {
                input: "0x5fb90badb37c5821b6d95526a41a9504680b4e7c8b763a1b1d49d4955c848621",
                output: "7SfPRReRgtnKSwxv8fTXaPAJiBNCPjRk739dcg1SoZf6",
            },
            {
                input: "0x6325253fec738dd7a9e28bf921119c160f0702448615bbda08313f6a8eb668d2",
                output: "7g2DQ4j7GMz1KojzA3gqc1JmMrLPN845RooyRD2H81cm",
            },
            {
                input: "0x0bf5059875921e668a5bdf2c7fc4844592d2572bcd0668d2d6c52f5054e2d083",
                output: "ogBdSx6BazhLzcFxPdwDdZH5RBFvjPvrcgdcYvfXUFU",
            },
            {
                input: "0x6bf84c7174cb7476364cc3dbd968b0f7172ed85794bb358b0c3b525da1786f9f",
                output: "8GUDmmvzFA8GS5WiVB4iTF3EGFrDfdNF686zZe8Apt54",
            },
            {
                input: "0xff094279db1944ebd7a19d0f7bbacbe0255aa5b7d44bec40f84c892b9bffd436",
                output: "JAZ9q6se7xCC3T93uNUX9Be68WDPZWs4js63HfKxZTLH",
            },
            {
                input: "0x29b0223beea5f4f74391f445d15afd4294040374f6924b98cbf8713f8d962d7c",
                output: "3ojVNZntfyH4jxozqp1saFaPwpaC3HkQ76nDz32Fkw8P",
            },
            {
                input: "0x8d019192c24224e2cafccae3a61fb586b14323a6bc8f9e7df1d929333ff99393",
                output: "AVRscmiypN4iZwvPhcwiEocnBCc9nMLNn77hxkvygdVt",
            },
            {
                input: "0x3bea6f5b3af6de0374366c4719e43a1b067d89bc7f01f1f573981659a44ff17a",
                output: "52tPbov2Pj8E77VLnATFiwweM6WnWX3SRTf3irCEsbeH",
            },
            {
                input: "0x4c7215a3b539eb1e5849c6077dbb5722f5717a289a266f97647981998ebea89c",
                output: "69Qt9w7zHsM7K2K2CBKicrD6bLs9426eWqEvQabY7Vfq",
            },
            {
                input: "0x0b4b373970115e82ed6f4125c8fa7311e4d7defa922daae7786667f7e936cd4f",
                output: "m61LeNo64BuJXhkNEUksDsuLHrK72euehDZ9XArsRJN",
            },
            {
                input: "0x24abf7df866baa56038367ad6145de1ee8f4a8b0993ebdf8883a0ad8be9c3978",
                output: "3U9mUEP8CoVU6iNxWPcjTmnW9pyL8mv2CDDvYtQyQZQB",
            },
            {
                input: "0xb04883e56a156a8de563afa467d49dec6a40e9a1d007f033c2823061bdd0eaa5",
                output: "Cs8tUzxiVeyGHbE8rq1kFAfX7DTEU8meoHrqTM7XsjQQ",
            },
            {
                input: "0x9f8e4da6430105220d0b29688b734b8ea0f3ca9936e8461f10d77c96ea80a7a6",
                output: "BjqgJrKCMnQie8X6zwVNBSfoqR4TSPXyyAuFg9rtBD5o",
            },
            {
                input: "0x65f606f6a63b7f3dfd2567c18979e4d60f26686d9bf2fb26c901ff354cde1607",
                output: "7s1mP4MawgThd8Hcci2Q9MGVh8nsma8sXeXUyC1qf3qp",
            },
            {
                input: "0xee294b39f32b7c7822ba64f84ab43ca0c6e6b91c1fd3be8990434179d3af4491",
                output: "H2gZ3p7ASETJECSqv3QhetX6rmXNmwy8DeBn8yZYjKcU",
            },
            {
                input: "0xa369012db92d184fc39d1734ff5716428953bb6865fcf92b0c3a17c9028be991",
                output: "BztKdz7kcjKT2iB8EtaZwHnRvQRkVEcrsMbt85v2uztp",
            },
            {
                input: "0x4eb7649c6c9347800979d1830356f2a54c3deab2a4b4475d63afbe8fb56987c7",
                output: "6JGzfGcopibgcXZMy35rRrSKwpKwhEQ32U47mRkhcfev",
            },
            {
                input: "0x7f5818526f1814be823350eab13935f31d84484517e924aef78ae151c0075592",
                output: "9a6gymCrkdNwqt37Ju1iJ1gQeTtUTbdT2qjZ2QtXzJUh",
            },
            {
                input: "0x5836b7075885650c30ec29a3703934bf50a28da102975deda77e758579ea3dfe",
                output: "6wMGXAVeoa1zkjxkPUx9DQh93bwPho2ATQxiaPwAA6xV",
            },
            {
                input: "0x4136abf752b3b8271d03e944b3c9db366b75045f8efd69d22ae5411947cb553d",
                output: "5PZrSD1oAcYxJTzFZecuXf1tRdVCzVhHPBsxmMwaFL3W",
            },
            {
                input: "0x7694267aef4ebcea406b32d6108bd68584f57e37caac6e33feaa3263a3994370",
                output: "8yt8jAbYf9Gu53cU7xpfsU8v7JYJ3ig1T5JqgLav35BV",
            },
            {
                input: "0x24ba9c9b14678a274f01a910ae295f6efbfe5f5abf44ccde263b5606633e2bf0",
                output: "3UNicdoQ1apUiiE31fjDKqfqYamoBxcBswe5swxExzMV",
            },
            {
                input: "0x006f28295d7d39069f01a239c4365854c3af7f6b41d631f92b9a8d12f4125732",
                output: "12hJr8m6Vf4bWABy1yoG1kbYGq3cCSx1RFRBiSg1jr3j",
            },
            {
                input: "0x5fff332f7576b0620556304a3e3eae14c28d0cea39d2901a52720da85ca1e4b3",
                output: "7TjS2GNd8iTK628JN6hXc73PJV9ecDyXXpvFMGBdxeRx",
            },
            {
                input: "0x8eaf3f44c6c6ef8362f2f54fc00e09d6fc25640854c15dfcacaa8a2cecce5a3a",
                output: "AbytBsuu3miWdKwPeEv4ZDbtukhCJNn6mLxfnEovsG3B",
            },
            {
                input: "0xba53ab705b18db94b4d338a5143e63408d8724b0cf3fae17a3f79be1072fb63c",
                output: "DYLq82etHh6TgNK9KNtjKUi35defDVEJR5XcXw6v6hkf",
            },
            {
                input: "0x35d6042c4160f38ee9e2a9f3fb4ffb0019b454d522b5ffa17604193fb8966710",
                output: "4d9tLRAhz7FAfcrh5GMTq3ohnir7xs1XxNFnZNoR25Hy",
            },
            {
                input: "0xa7960732ca52cf53c3f520c889b79bf504cfb57c7601232d589baccea9d6e263",
                output: "CHBmjAaLTEcfi4FkccKSueyhu6j8uLQSQUbph5Z4nCjU",
            },
            {
                input: "0xe25c27741d3f6c62cbbb15d9afbcbf7f7da41ab0408e3969c2e2cdcf233438bf",
                output: "GEceCCiA18Uqfmkqangobx5rSSMkDuUZGUXREpA7gsLJ",
            },
            {
                input: "0x1774ace7709a4f091e9a83fdeae0ec55eb233a9b5394cb3c7856b546d313c8a3",
                output: "2aZZnuNV1gK451LQD4dPprVGEmYBUPgakXajt3PcbWQS",
            },
            {
                input: "0xb4c1c0e05447f4ba370eb36dbcfdec90b302dcdc3b9ef522e2a6f1ed0afec1f8",
                output: "DAbk3StZjeAJfE9ZKHep2NwWjp3UCZ14TeLgohRxzjtj",
            },
            {
                input: "0xe20faabedf6b162e717d3a748a58677a0c56348f8921a266b11d0f334c62fe52",
                output: "GDSzkMWaxBk5cNPTUgDU4i435c2dYUqZDNwz33aQVoNh",
            },
            {
                input: "0xba53af19779cb2948b6570ffa0b773963c130ad797ddeafe4e3ad29b5125210f",
                output: "DYLqra6NJCf3eUrQbSMn7wGcQrdXmeCh6FriQ51f1gCv",
            },
            {
                input: "0x0ef1c314090f07c79a6f571c246f3e9ac0b7413ef110bd58b00ce73bff706f7f",
                output: "21LXMUhu2M8suJ6VfkdVvTCo4iXkovaVj6b8Q8mHmMPL",
            },
            {
                input: "0xf4b6f44090a32711f3208e4e4b89cb5165ce64002cbd9c2887aa113df2468928",
                output: "HUGHTh4BZk6oUdUHWMxusZ7BVzsXugGGVapSSN8hiqFu",
            },
            {
                input: "0xd5a23b9ca740f80c9382d9c6034ad2960c796503e1ce221725f50caf1fbfe831",
                output: "FNwKWk3jgEPTLJh5JqWzkPMBpwY9X7kcgNid1UxUga8G",
            },
            {
                input: "0xb10b7bf5b15c47a53dbf8e7dcafc9e138647a4b44ed4bce964ed47f74aa59446",
                output: "Cv7KWoZ61uz1ANXxYB1anPbfDch7YXZoXPtCjF31NuXb",
            },
            {
                input: "0x8ced323cb76f0d3fac476c9fb03fc9228fbae88fd580663a0454b68312207f0a",
                output: "AV7rc389xphXeqU26ZdHdZSX3xzjmYPJ6v7qvENLWSuf",
            },
            {
                input: "0x3b584c62316492b49753b5d5027ce15a4f0a58250d8fb50e77f2bf4f0152e5d4",
                output: "4zf9T8DCBG5AAvb59sUmrXBSBSm5CV4uvwMXEBAHXHB1",
            },
            {
                input: "0x9435807f9d4b97be6fb77970466a5626fe33408cf9e88e2c797408a32d29416b",
                output: "AyYf61eCjGZu9XjBYxq4iqEUd9onZimyNKZvNF858BB8",
            },
            {
                input: "0xaf206a329cfffd4a75e498320982c85aad70384859c05a4b13a1d5b2f5bfef5a",
                output: "Cnd1sJQBoNrE2FYHnxGHfHPXHwNr9C21oW5XtcGU29pV",
            },
            {
                input: "0x6ed92da482caa9568e5b6fe9d8a9ddd9eb09277b92cef9046efa18500944cbe8",
                output: "8ThvP1Y8YjP1Xt6XKjCLGEYyhZGi7AzH5aHf4q79kw99",
            },
            {
                input: "0x00a0b1527ea64729a861d2f6497a3235c37f4192779ec1d96b3b1c5424fce0b7",
                output: "13T7oxd8fe4RuJpygwE75TGG5gTJESJVGbMYUjYXEHrN",
            },
            {
                input: "0x27b03072e6415a761f03abaa40abc9448fddeb2191d945c04767af847afd0edb",
                output: "3fvivmqcNbEEogDNyNbWf9SanZmrUaVZVb5tQ3DGvCtA",
            },
            {
                input: "0x5d8857b799acb18e4affabe3037ffe7fa68aa8af5e39cc416e734d373c5ebebc",
                output: "7J7VtLNjDxvdqq9An6hDiCkQQNTEnjx9XarPCkb7yQSw",
            },
            {
                input: "0x9cdcc595bcce3c7bd3d8df93fab7e125ddebafe65a31bd5d41e2d2ce9c2b1789",
                output: "BZKrT2Uk9T8jzXQrYnSpjKr9Es4jZtm6Lh8PKzhd3XxC",
            },
            {
                input: "0x2f0fea1931a290220777a93143dfdcbfa68406e877073ff08834e197a4034aa4",
                output: "4AiEixuMYHszdqQgXBnxnXfaYHyNYmkhTHtD5T7DPcnP",
            },
            {
                input: "0x8afa3f85b8a62708caebbac880b5b89b93da53810164402104e648b6226a1b78",
                output: "AMWapF9trWahDZgfXqyXp1gjSZX4EP36t7aC9WKec9cb",
            },
            {
                input: "0x021851f5d9ac0f313a89ddfc454c5f8f72ac89b38b19f53784c19e9beac03c87",
                output: "9BKoqELoatvS9jzSBcesFvFgoFYhwJnYieHeSqHro3t",
            },
            {
                input: "0x5a27db029de37ae37a42318813487685929359ca8c5eb94e152dc1af42ea3d16",
                output: "74vwbEqhkVXeKqSRVKza2PSiLn1PQiaNCpomx76Wp1Sd",
            },
            {
                input: "0x76c1bdd19ab8e2925c6daee4de5ef9f9dcf08dfcbd02b80809398585928a0f7d",
                output: "8zaTMCy5UNcGiFazFnjLU48Y89Bstj8uD5sZCwBhybvt",
            },
            {
                input: "0xe50be1a6dc1d5768e8537988fddce562e9b948c918bba3e933e5c400cde5e60c",
                output: "GR6sWPJx5MV3t9sD1i4AvMKKr7Tf1huoPb2GiBa9wqpP",
            },
            {
                input: "0x5ead6fc7ae77ba1d259b188a4b21c86fbc23d728b45347eada650af24c56d080",
                output: "7NaiHcJvs3hjzEwMgyqGh5XntsyggeEDPbMdg4rzzdcj",
            },
            {
                input: "0x0a8691332088a805bd55c446e25eb07590bafcccbec6177536401d9a2b7f512b",
                output: "i669zSfbCZHtJPHdFT7q95DLDawP2XmKh4unvy9Npgr",
            },
            {
                input: "0x54bfc9d00532adf5aaa7c3a96bc59b489f77d9042c5bce26b163defde5ee6a0f",
                output: "6hpsBUhcTBMsY78VNKst2UVnaZFAUYJwqaENX2P7wBuG",
            },
            {
                input: "0xbb3e9346cef81f0ae9515ef30fa47a364e75aea9e111d596e685a591121966e0",
                output: "Dbvaionf1CRAkDwxDo1U7axZ7LpccKwEJu5gXEpohASs",
            },
            {
                input: "0x31650d510354aa845580ff560760fd36514ca197c875f1d02d9216eba7627e23",
                output: "4KpMC2osVQdhGGqo5NrtfSCdDDjnRE6cJzN7uYD7GVvz",
            },
            {
                input: "0x98322eb5cf43d72bd2e5b887d4630fb8d4747ead6eb82acd1c5b078143ee26a5",
                output: "BF7MQ4cpwZUjwatQ4jPYybjmiJpbpSzX4qKZeu8Dfxdr",
            },
            {
                input: "0x86ad23139d5041723470bf24a865837c9123461c41f5ff99aa99ce24eb4d7885",
                output: "A4ikn13VFbhu2xRbZ5jS3wVTXCEwHDrcnRGopbn5pvFn",
            },
            {
                input: "0x76e3336e65491622558fdf297b9fa007864bafd7cd4ca1b2fb5766ab431a032b",
                output: "9163fdbxDGSHM5C8yFLdECUm1nnUTA8yCm27KFy1EQiW",
            },
            {
                input: "0x72b9a7e937ed648d0801f29055d3090d2463718254f9442483c7b98b938045da",
                output: "8iqg1WhYjD6BPa6AyiEPhdwGTbeuqNFpjCgeW7YCtJQy",
            },
            {
                input: "0x519843854b0ed3f7ba951a493f321f0966603022c1dfc579b99ed9d20d573ad5",
                output: "6VWgotnHxj6i8GoMXvWzMoiYxwW32dXeWVY6nWRdoZPi",
            },
            {
                input: "0x3171c8fef7f1f4e4613bb365b2ebb44f0ffb6907136385cdc838f0bdd4c812f0",
                output: "4L1cLqbfJos4n2R8WgNLgT82X4ahgkXbE1q1rKPvRcdD",
            },
            {
                input: "0x42577410aca008c2afbc4c79c62572e20f8ed94ee62b4de7aa1cc84c887e1f7c",
                output: "5TyFdcoStT5gnxXMoU2VEeMbhzjBU87x91MhAPko59qV",
            },
            {
                input: "0x31e927dfe52a5f8f46627eb5d3a4fe16fafce23623e196c9dfff7fbaff4ffe94",
                output: "4MqBWyygHhZ1ESvqRKJMTPY412Af3amNvaJ74Q53vkFu",
            },
            {
                input: "0xf4589733e563e19d3045aad3e226488ac02cca4291aed169dce5039d6ab00e40",
                output: "HSpq3Gf9hxGC2aKfVqcrjikgwHsiRgSTsNDCajTxEs3D",
            },
            {
                input: "0xf67aab29332de1448b35507c7c8a09c4db07105dc31003620405da3b2169f5a9",
                output: "Hb9nNvU6pi3DZBfXSXKDhcotLsKNiirygH799jrRkFQc",
            },
            {
                input: "0x10c9d0096e5e3ef1b570680746acd0cc7760331b663138d6d342b051b5df4106",
                output: "28Y1RXGnfhtdZyd4S3MWtmpTKj4dn9EpGVmyJ5rayg85",
            },
            {
                input: "0x37cf7aee9b0c8c10a8f9980630f34ce001c0ab7ac65e502d39b216cbc50e73a3",
                output: "4krvMcXaR1vka6GYSL2gPPEzu62zFtWRigWjxVTSrovr",
            },
            {
                input: "0x2eaf936401e2506bd8b82c30d346bc4b2fa319f245a8657ec122eaf4ad5425c2",
                output: "49F2yy6UWhFQzWWnTKf79qxC86PGxDBHwPBnU8iGFTYM",
            },
            {
                input: "0x49ee160e17b95541c2aee5df820ac85de3f8e784870fd87a36cc0d163833df63",
                output: "5ybKwUFfVTuPbcVh5wJzEhnuzJ3BLGsX9qC2tms3mm7Q",
            },
            {
                input: "0x6613a9cc947437b6592835b9f6f4f8c0e70dbeebae7b14cdb9bc41033aa5baf4",
                output: "7sTyaVjxfazT4XasA12qkHn1AntKK1yCGNvFAqQQ6FuV",
            },
            {
                input: "0x0d45e24d72eac4a28e3ca030c9937ab8409a7cbf05ae21f97425254543d94d11",
                output: "tp791eQenH9zbwELdSheuHL2G7h19shSKo5eKTYaEXS",
            },
            {
                input: "0x5900b90ae703b97d9856d2441d14ba49a677de8b18cb454b99ddd9daa7ccbb75",
                output: "6zRvcaS2eZMSzFxN5JR4bjPH2f8NLfh457ureb8jP8mJ",
            },
            {
                input: "0x00dae4e2e5df8cf3859ebddada6745fba6a04c5c37c7ca35036f11732ce8bc27",
                output: "14LbHG4wXEskm8JgHKqJyryd3wj9CQsMB7i55x7eTKpS",
            },
            {
                input: "0xb48868611fc73c82a491bfabd7a19df50fdc78a55dbbc2fd37f9296566557fab",
                output: "D9j2U4ju4o8iMTu1NGWHwPYDNGpfNGfQ2JGNooDetwHk",
            },
            {
                input: "0x885b039f30e706f0cd5961e19b642221db44a69497b8ad99408fe1e037c68bf7",
                output: "ABGwY4p6ZgQuXpFjzDfAeBZS3KtwkNxkhk2Tvoruzwxa",
            },
            {
                input: "0xc5e5de1d2c68192348ec1189fb2e36973cef09ff14be23922801f6eaee414091",
                output: "EKWcXeXbr8q7no2fsm5c2PaX9oU6DaFHLet3396qfdGC",
            },
            {
                input: "0x58b45f2dec82d17caaba160cd640ff73495fe4a05ce1202ca7287ed3235b95e6",
                output: "6yGQ9gXM9DDkByWJZv26FxV7gSef8cYsUtPfqYrsYCmB",
            },
            {
                input: "0x9f571fa5e656aaa51fae1ebdd7aa6269c2ec7f4057b33593bc84888c970fd528",
                output: "BizsqcXvXaByme9MfQMnEqpCRoutL8pL9JvoBcjaUn3R",
            },
            {
                input: "0xd4a99a1eab9d2420134537cd6d02282e0981e140232a4a87383a21d1845c408a",
                output: "FK9RsZ7LJcB2JD3xzkd7K1KqoSKQBXmLrz6rLsfvzhXf",
            },
            {
                input: "0xd757043813032a0bd5a30dcca6e3aa2df04715d879279a96879a4f3690ac2025",
                output: "FVbcYaWh2f5NXaor2dtDhEZrAKhovr8HQNWR7Mm4TUMJ",
            },
            {
                input: "0xa60c7db15e0501ebc34b734355fe4a059bd3899d920e95f1c46d432f9b08e64d",
                output: "CBBj3dpaTrDAnJ3x41e2MSZiFkdjsRtK37xJNuZA58ag",
            },
            {
                input: "0x7f9b38965d5a77a7ac183c3833e1a3425ead69d4f975012fd1a49ed832f69e6e",
                output: "9b84F2dYjYSTcvDr9hGoDYkt3y6mGqJnEeTmdikXFcL5",
            },
            {
                input: "0x9c63b453ec049c9e7a5cf944232d10353f64434abae060f6506ad3fdb1f4415b",
                output: "BXUnEhBZratySCBTXSnuZ5VFVtxU8RzXkHZSyBr2eUok",
            },
            {
                input: "0x0af9ce8c208bc20ee526741539fa3203c77ecba410fd6718f227e0b430f9bcb0",
                output: "jr1RtwsagXM4a6sHCbBhp8zk7xRpFkaJFmSuLkceQ9D",
            },
            {
                input: "0x49a3d38540dc222969120ce80f2007cd42a708a721aa29987b45d4e428811984",
                output: "5xTejyEP6RDqoFPYVTJgMRix1yLx7gZDruetxmVQTyU7",
            },
            {
                input: "0xecad349cc35dd93515cefe0b002cee5e71c47935e281ebfc4b8b652b69ccb092",
                output: "GvtQEK6ue9FU76P2iy9gMt6z9bZvYsp7ndJSn8EEKyay",
            },
            {
                input: "0xe55a20f1b9f97d046296124621928739a86671cc180152b953e3bf9d19f825c3",
                output: "GSJ5EmADcFSyNWdeyKEA2uhxPLYsrkUKejPbJt34bahG",
            },
            {
                input: "0xdd54ae1688e49efb5efe65dcdad34bc860010e7c8c997cd5f9e320ca7d39d4ba",
                output: "FtyzaHkjQbkP7BTDasN6AK9CZ8biRAgNKFXY6cXAxDbo",
            },
            {
                input: "0x801a175b1c76f057832f3f36d7d893e216e4c7bbdb548d0ba48449330027368b",
                output: "9d4G7S8FMdVBFxCeUL2NTo1FVW6ydPBZJNRTXm6BSbYN",
            },
            {
                input: "0x34f9c69776b4591532da1c5be68ef4eebe8cb8fa7dc5483fb70c2c896334cb1f",
                output: "4Zo6zEqEYDHeSeUPnRKZb4Yiy7efSgD4exAqC6ZN4put",
            },
            {
                input: "0x9cb5dfe044fa086197ff5dfd02f2ba3884c53dd718c8560da743a8e9d4aeae20",
                output: "BYjTCAWsZqoKGv1gr2F4p6WM4KAuPFJkMwrPPxTtPZXu",
            },
            {
                input: "0xccef002d82ca352592b8d8f2a8df3b0c35f15b9b370dca80d4ca8e9a133eb520",
                output: "EnyYYEsD66dj1BqHXaa9diVaSAoprYJac9rHDnsN39Dh",
            },
            {
                input: "0x94f2dd5c08731f52315d828846e37df68fd10658b480f2ac84233633957e688e",
                output: "B2S8YQyWJPArQjeQF9GMHD6LwBMKJ3EQ5Lvcv84mqj2D",
            },
            {
                input: "0x924ffe3713b52c76fd8a56da8bb07daa8eb4eb8f7334f99256e2766a4109150e",
                output: "Ar9GffCUDVwzchRLmrAPwZFSH7sppknGZrQurdPufGiy",
            },
            {
                input: "0xed424f0f743543cdea66e5baaa03edc918e8305bb19fc0c6b4ddb4aa3886cb50",
                output: "GyAGZLkmEF5xnWACmVePVh4vkpffAS3BZXWUrAp1vBRH",
            },
            { input: "0x52", output: "2R" },
            { input: "0xfdfc", output: "LL3" },
            { input: "0x072182", output: "3PvR" },
            { input: "0x654f163f", output: "3bCKCa" },
            { input: "0x5f0f9a621d", output: "Bj3dXQp" },
            { input: "0x729566c74d10", output: "z4SSQRtT" },
            { input: "0x037c4d7bbb0407", output: "8fLm1SwwC" },
            { input: "0xd1e2c64981855ad8", output: "c7A2FPxxNr3" },
            { input: "0x681d0d86d1e91e0016", output: "2Ks4zyL6tD9PB" },
            { input: "0x7939cb6694d2c422acd2", output: "7p293TmhWR7KfX" },
            { input: "0x08a0072939487f6999eb9d", output: "393xdn816o55GWG" },
            {
                input: "0x18a44784045d87f3c67cf227",
                output: "TyJ7Raqme5iBTAzi",
            },
            {
                input: "0x46e995af5a25367951baa2ff6c",
                output: "6uaHC1S2iWJM1Me75d",
            },
            {
                input: "0xd471c483f15fb90badb37c5821b6",
                output: "2M6uQa9boLJPFsMC2XRw",
            },
            {
                input: "0xd95526a41a9504680b4e7c8b763a1b",
                output: "75f7Gkgg7EFbVLWyPrKNA",
            },
            {
                input: "0x1d49d4955c8486216325253fec738dd7",
                output: "4cmS5nR11WdCtDgJK7R9Gr",
            },
            {
                input: "0xa9e28bf921119c160f0702448615bbda08",
                output: "2bbQ6J2jddNFDZqXGtKeRdnw",
            },
            {
                input: "0x313f6a8eb668d20bf5059875921e668a5bdf",
                output: "33UUHKmbxTwAHnbzUtehB1DX4",
            },
            {
                input: "0x2c7fc4844592d2572bcd0668d2d6c52f5054e2",
                output: "99VoYbMrUj8jaFDWMSQirMwiTj",
            },
            {
                input: "0xd0836bf84c7174cb7476364cc3dbd968b0f7172e",
                output: "3uVDydkggMDs4EFDw1CABMGZoNxu",
            },
            {
                input: "0xd85794bb358b0c3b525da1786f9fff094279db1944",
                output: "EJb1Yvy1jKjRMjYMKdmoYyhnTe2CT",
            },
            {
                input: "0xebd7a19d0f7bbacbe0255aa5b7d44bec40f84c892b9b",
                output: "271bJxeMK7m94A9U5xtKrTYWvftvBra",
            },
            {
                input: "0xffd43629b0223beea5f4f74391f445d15afd4294040374",
                output: "6HUJpKT3mocSr2NU3io5EMeY37yCyZcP",
            },
            {
                input: "0xf6924b98cbf8713f8d962d7c8d019192c24224e2cafccae3",
                output: "PUkUy2SPdrVtJmLb48HXGdgitWM5jUA4S",
            },
            {
                input: "0xa61fb586b14323a6bc8f9e7df1d929333ff993933bea6f5b3a",
                output: "29qznrdXSTotnjDxhbXtdjmGAxg1YjUSySR",
            },
            {
                input: "0xf6de0374366c4719e43a1b067d89bc7f01f1f573981659a44ff1",
                output: "8ZSZMEwgCysxXsxZad5J8NdmgwjtuWnATtfi",
            },
            {
                input: "0x7a4c7215a3b539eb1e5849c6077dbb5722f5717a289a266f976479",
                output: "HXhMyGZtkfUxc64hsZy2ufCoemdUcWQqAxiUp",
            },
            {
                input: "0x81998ebea89c0b4b373970115e82ed6f4125c8fa7311e4d7defa922d",
                output: "2LK757ZC1APRN6RNtyvtZKJwTLu8JErfxNRyN1S",
            },
            {
                input: "0xaae7786667f7e936cd4f24abf7df866baa56038367ad6145de1ee8f4a8",
                output: "8kzj8VE3fVN8XBg5fTGY34uWXcMFJsX68vjGAU3H",
            },
            {
                input: "0xb0993ebdf8883a0ad8be9c3978b04883e56a156a8de563afa467d49dec6a",
                output: "cPN9q4Ra634M8opvSrg7o2EHhSy5e3dtQcCN7o36H",
            },
            {
                input: "0x40e9a1d007f033c2823061bdd0eaa59f8e4da6430105220d0b29688b734b8e",
                output: "zQj4X5qk5iVMWqDXjtY3wfCzbDhxn9FzLHqqsdzVFB",
            },
            {
                input: "0xa0f3ca9936e8461f10d77c96ea80a7a665f606f6a63b7f3dfd2567c18979e4d6",
                output: "BqHqqTms92cp5NWrcRDK5E8jf7W95AhHnNmL4aZAc7Kb",
            },
            {
                input: "0x0f26686d9bf2fb26c901ff354cde1607ee294b39f32b7c7822ba64f84ab43ca0c6",
                output: "5W2gQhuoZCo2vR3LCvjFEiHpBeZRGoKUoQLuZ4c9AhtGd",
            },
            {
                input: "0xe6b91c1fd3be8990434179d3af4491a369012db92d184fc39d1734ff5716428953bb",
                output: "6DX19je8oMnWxFF22mcdvxDoRyTaUqyoKhusYCiFZzKRQcJ",
            },
            {
                input: "0x6865fcf92b0c3a17c9028be9914eb7649c6c9347800979d1830356f2a54c3deab2a4b4",
                output: "BRBKsKGr3E229C7L8wju56ecUWsAQyoZfUrCbux85umMaK2B",
            },
            {
                input: "0x475d63afbe8fb56987c77f5818526f1814be823350eab13935f31d84484517e924aef78a",
                output: "YRvFUCX6FHQvgJ45dCVduQ7C9pYLSAwpwwkfaixPqJXMsrp3s",
            },
            {
                input: "0xe151c00755925836b7075885650c30ec29a3703934bf50a28da102975deda77e758579ea3d",
                output: "8YzVtbKW5e6AAi9sFPiLPHaW1zJuSjRHxAJwV5zwSwxxsC8aZwA",
            },
            {
                input: "0xfe4136abf752b3b8271d03e944b3c9db366b75045f8efd69d22ae5411947cb553d7694267aef",
                output: "ecTvgyYTRi35HBQ2SmRYhGde2vAhekbLYUjWE5BByHKjx48pUUV4",
            },
            {
                input: "0x4ebcea406b32d6108bd68584f57e37caac6e33feaa3263a399437024ba9c9b14678a274f01a910",
                output: "tQn3fiefMif7rjcbYvXkJ7W8wMuDRrXWP6wum5JNuDPdjGUrUkzDD",
            },
            {
                input: "0xae295f6efbfe5f5abf44ccde263b5606633e2bf0006f28295d7d39069f01a239c4365854c3af7f6b",
                output: "9eutNS6rhCSuJdpXxdzjkgThnNNcGScMVBUWL6gxQ3h6D8TVREVNzAv",
            },
            {
                input: "0x41d631f92b9a8d12f41257325fff332f7576b0620556304a3e3eae14c28d0cea39d2901a52720da85c",
                output: "FSSfgTUqUKgT9e1CsPdWsFh4kitpTA47an2gXPzbomQaStMFGEtqrnyH",
            },
            {
                input: "0xa1e4b38eaf3f44c6c6ef8362f2f54fc00e09d6fc25640854c15dfcacaa8a2cecce5a3aba53ab705b18db",
                output: "3hiFRFjs3uVG3RfqC15qYaJryqF1B9AmZBuefxT5ouFoXr9HKqM3jyYKYv",
            },
            {
                input: "0x94b4d338a5143e63408d8724b0cf3fae17a3f79be1072fb63c35d6042c4160f38ee9e2a9f3fb4ffb0019b4",
                output: "BxMFNKtgmm723Ubhy8rWgAnFGNnmpnQ35ur693ChpeisLsLSa8AMRQBrApb",
            },
            {
                input: "0x54d522b5ffa17604193fb8966710a7960732ca52cf53c3f520c889b79bf504cfb57c7601232d589baccea9d6",
                output: "UameBF9aitUWJ6rnsvXgj4VtGQe4UpMUQPPYiRu2VaiSNTQaQB7zjnfMY1yF",
            },
            {
                input: "0xe263e25c27741d3f6c62cbbb15d9afbcbf7f7da41ab0408e3969c2e2cdcf233438bf1774ace7709a4f091e9a83",
                output: "6btdBL2oxr5jsmgSCZERqSDcSgQeTmDJPmaAU24SPQAQKTRV7L8wEqzQ8Xc5qU",
            },
            {
                input: "0xfdeae0ec55eb233a9b5394cb3c7856b546d313c8a3b4c1c0e05447f4ba370eb36dbcfdec90b302dcdc3b9ef522e2",
                output: "UjMvSDzxTvruWAs3TLCvoSuSpaXRNjG9UQD3QP6JfCW56mRwj4dEjEXvfdKw28R",
            },
            {
                input: "0xa6f1ed0afec1f8e20faabedf6b162e717d3a748a58677a0c56348f8921a266b11d0f334c62fe52ba53af19779cb294",
                output: "2PUQz6j4B63uZYJadQJtGeUEVyzznHbxJKd783b36umdpY6UogBgLHjFAbX69L5qD",
            },
            {
                input: "0x8b6570ffa0b773963c130ad797ddeafe4e3ad29b5125210f0ef1c314090f07c79a6f571c246f3e9ac0b7413ef110bd58",
                output: "67aUzniduF5QfRLfB3h2ocbmkrN3Jsxh5nNvo8AP3Z1Ss9j54cjgFJ6sHEyUyEWoHh",
            },
            {
                input: "0xb00ce73bff706f7ff4b6f44090a32711f3208e4e4b89cb5165ce64002cbd9c2887aa113df2468928d5a23b9ca740f80c93",
                output: "VWEtjpac7ovXwD6MKwMXChaYKRNdk34KJBwJLnH4DpE47HVyaZzLycmKyBLHkfXRb3x",
            },
            {
                input: "0x82d9c6034ad2960c796503e1ce221725f50caf1fbfe831b10b7bf5b15c47a53dbf8e7dcafc9e138647a4b44ed4bce964ed47",
                output: "2cWb7ThPByG3sX6PqWxF47dQnfVEed3oCHPEqVb15t1Wapf69zZRXFfuLkAPf3yf9D2Xx",
            },
            {
                input: "0xf74aa594468ced323cb76f0d3fac476c9fb03fc9228fbae88fd580663a0454b68312207f0a3b584c62316492b49753b5d5027c",
                output: "ET1z56j5RkYzmUgwKKC8hVVTdCL9va3xcTcCD3b9bnjU2kbcbLYRbbtGAxnBCyhfkvyyvj",
            },
            {
                input: "0xe15a4f0a58250d8fb50e77f2bf4f0152e5d49435807f9d4b97be6fb77970466a5626fe33408cf9e88e2c797408a32d29416baf20",
                output: "w6Q4qsd9Hg8oGDUoqUjSH8Sf8LxQKyTKBWxwRvoqCMpdG31nS1BquJ8QwZJgteyCTfTd2Xq",
            },
            {
                input: "0x6a329cfffd4a75e498320982c85aad70384859c05a4b13a1d5b2f5bfef5a6ed92da482caa9568e5b6fe9d8a9ddd9eb09277b92cef9",
                output: "2wWoRnwK5T6SVF75YAFB5yFvpyjCB8Cm7aopDMHiervx39SzvXUPqX9nELqMuw6xMiY4pUUNc",
            },
            {
                input: "0x046efa18500944cbe800a0b1527ea64729a861d2f6497a3235c37f4192779ec1d96b3b1c5424fce0b727b03072e6415a761f03abaa40",
                output: "MjUp7AvrW8CQurLsp6uSgnAAf9V89NnVxJ51M3YgdUGTnY65cQqiJavTsxJLkN5K5sKBUum7d",
            },
            {
                input: "0xabc9448fddeb2191d945c04767af847afd0edb5d8857b799acb18e4affabe3037ffe7fa68aa8af5e39cc416e734d373c5ebebc9cdcc595",
                output: "248i2ChLfWyro9pyvz3opABWQj2Bi2ZePxJADiA7FbGwHfBdPdL2ZXXMpEFe5MyA95cdBD13QGWp",
            },
            {
                input: "0xbcce3c7bd3d8df93fab7e125ddebafe65a31bd5d41e2d2ce9c2b17892f0fea1931a290220777a93143dfdcbfa68406e877073ff08834e197",
                output: "67ZWuGC5jVU9u6FV3EcrRz48Z1RNKjpbMj5kQYPPnuhpvXLeJdpFhp1vKS8JVpDE5zAy4MeJYGFLi",
            },
            {
                input: "0xa4034aa48afa3f85b8a62708caebbac880b5b89b93da53810164402104e648b6226a1b78021851f5d9ac0f313a89ddfc454c5f8f72ac89b38b",
                output: "Lc5FQmFQGPHM71pbH3LByCESCEJnBU78Y2dorCXRqCXCko9Mis9dc81FacvbhT2q7efpBnp3YeVBqt",
            },
            {
                input: "0x19f53784c19e9beac03c875a27db029de37ae37a42318813487685929359ca8c5eb94e152dc1af42ea3d1676c1bdd19ab8e2925c6daee4de5ef9",
                output: "EhKABu4h7KWgfW6rDzT746kwPGnAWr2SJLP5Zf7C4tKyQBWpMTHsLqrC8qPJs3fJQrVcPK1aDpuzid6",
            },
            {
                input: "0xf9dcf08dfcbd02b80809398585928a0f7de50be1a6dc1d5768e8537988fddce562e9b948c918bba3e933e5c400cde5e60c5ead6fc7ae77ba1d259b",
                output: "B2r75MgsRLrPA1NyfrABzD4rJTbJ3NECyibvEixp2F5gpHR3mVzLwRdvn1qnhvwB2XPCsWuyhimGwJwvS",
            },
            {
                input: "0x188a4b21c86fbc23d728b45347eada650af24c56d0800a8691332088a805bd55c446e25eb07590bafcccbec6177536401d9a2b7f512b54bfc9d00532",
                output: "5MELgyXUNCLh7HcQ2bHneHfjY2KiKcGhUrFaLnX2FFxb5YbojhY5MH8kvn7Nz5Q3VE2WaRtJY61U3ov1Y5",
            },
            {
                input: "0xadf5aaa7c3a96bc59b489f77d9042c5bce26b163defde5ee6a0fbb3e9346cef81f0ae9515ef30fa47a364e75aea9e111d596e685a591121966e031650d",
                output: "3M4rQuahxXQj2pyMNAaZQq1BiSU9ahTY5vtptU4LkWRr5ob8MpPPyQUYh5LtoCwFbiQxiNGLCXUwNYhvHHfa",
            },
            {
                input: "0x510354aa845580ff560760fd36514ca197c875f1d02d9216eba7627e2398322eb5cf43d72bd2e5b887d4630fb8d4747ead6eb82acd1c5b078143ee26a586",
                output: "5pgjNdvwhrt3QkrtZZwoVLjXydS7QpTv3jXXo19NxXLnRu9s8G3e7pqN32jH2YapfGDLP6baYdfM6xz8SZDmo",
            },
            {
                input: "0xad23139d5041723470bf24a865837c9123461c41f5ff99aa99ce24eb4d788576e3336e65491622558fdf297b9fa007864bafd7cd4ca1b2fb5766ab431a032b",
                output: "nVFdhMSWrdxqjHE3RGE9hLytR3tZNNEBiXehJCD6zWcQacVi6roSc1GvuuMRqweQPrLYXCyp992Thpdt2horKc",
            },
            {
                input: "0x72b9a7e937ed648d0801f29055d3090d2463718254f9442483c7b98b938045da519843854b0ed3f7ba951a493f321f0966603022c1dfc579b99ed9d20d573ad5",
                output: "3J36Byqb35GRBXvExbqgWZCJNX6tXpBnUkpNTQ7MWdohLARLWVX8Hsqs1bobNbcvhacmNxrYL6n4xY84G4cGtFXA",
            },
            {
                input: "0x3171c8fef7f1f4e4613bb365b2ebb44f0ffb6907136385cdc838f0bdd4c812f042577410aca008c2afbc4c79c62572e20f8ed94ee62b4de7aa1cc84c887e1f7c31",
                output: "5N53MvmZjqgafkhAmsLsmiYFGzak278DcfaZC6nAVvyHTCeECGugCAWQeXBZS5xaPbKPY2vQhX7KxQPZjmpHGUFUt",
            },
            {
                input: "0xe927dfe52a5f8f46627eb5d3a4fe16fafce23623e196c9dfff7fbaff4ffe94f4589733e563e19d3045aad3e226488ac02cca4291aed169dce5039d6ab00e40f67aab",
                output: "2ZpD4PbCogXbgNXCLzzKFnLRjajBN2u9DFHNgRwMuXk2ouBvmnVm6xPUCDhPu2t8TY2Z5GUfGXLLx9n1SHuhLwXZajc",
            },
            {
                input: "0x29332de1448b35507c7c8a09c4db07105dc31003620405da3b2169f5a910c9d0096e5e3ef1b570680746acd0cc7760331b663138d6d342b051b5df410637cf7aee9b0c",
                output: "2Dq7hVeZjwTek5pWFQLJPHUMWgsi3bBxo1SXS3Zp7AZpYPj9yWT1DsBGnbTCwZjqnrPksuJejceUwjGJXXt3uNd1A2pT",
            },
            {
                input: "0x8c10a8f9980630f34ce001c0ab7ac65e502d39b216cbc50e73a32eaf936401e2506bd8b82c30d346bc4b2fa319f245a8657ec122eaf4ad5425c249ee160e17b95541c2ae",
                output: "KKpcsXJq6q6USAHkV2qR7haL2HC89Lw2Yxzx18QvaE2u2zVuDnmpgud5A6eCP9pb2oUGtRJiodL1KwnzZKc7NCAwjbLCM",
            },
            {
                input: "0xe5df820ac85de3f8e784870fd87a36cc0d163833df636613a9cc947437b6592835b9f6f4f8c0e70dbeebae7b14cdb9bc41033aa5baf40d45e24d72eac4a28e3ca030c9937a",
                output: "3HjvuwnUWg9scK6UzWVYxEvWiZcZn63BrtSA3HZZsh5VotvnBixx9WJYuFrcPypbGWmrJQ3ZdPBjEqY4kExa42uG7RvxLq7",
            },
            {
                input: "0xb8409a7cbf05ae21f97425254543d94d115900b90ae703b97d9856d2441d14ba49a677de8b18cb454b99ddd9daa7ccbb7500dae4e2e5df8cf3859ebddada6745fba6a04c5c37",
                output: "96cW47Zzbhw148MYxd7aRET7rM4ooQBWV63viBS4EjTs7UPuxDiGYBYTXwqSAaB8kcwNmXTwXKQJM3EeVf4ywUN2r4SmnMyG",
            },
            {
                input: "0xc7ca35036f11732ce8bc27b48868611fc73c82a491bfabd7a19df50fdc78a55dbbc2fd37f9296566557fab885b039f30e706f0cd5961e19b642221db44a69497b8ad99408fe1e0",
                output: "fkZb3cLZJFWSGNxSBqtkcBnDVArvB6Q3idy4VuqwrKU4zers5RAuUBqBVh7maDxpRiyBSiTLwT4ZDjmWZUcxJCScqPqo4CTRZ",
            },
            {
                input: "0x37c68bf7c5e5de1d2c68192348ec1189fb2e36973cef09ff14be23922801f6eaee41409158b45f2dec82d17caaba160cd640ff73495fe4a05ce1202ca7287ed3235b95e69f571fa5",
                output: "pkTM9as3BLq6hj2xQL6fNyfSMPRksJTB1FV1vULx6H2nZc9f2Li5cK1GCdB9nEeCgckFR14jKN7vS6wJhybUun3VgGXBvJoG3v",
            },
            {
                input: "0xe656aaa51fae1ebdd7aa6269c2ec7f4057b33593bc84888c970fd528d4a99a1eab9d2420134537cd6d02282e0981e140232a4a87383a21d1845c408ad757043813032a0bd5a30dcca6",
                output: "G1N6KmkQm8WYLrHqgH9THcnWeVssM66P2Q4PGmJvkKqUuJJksNhqta5hxbnEyeja41n85PQ7FhrpiZY74az69qYP5joPBhEhtrAZ",
            },
            {
                input: "0xe3aa2df04715d879279a96879a4f3690ac2025a60c7db15e0501ebc34b734355fe4a059bd3899d920e95f1c46d432f9b08e64d7f9b38965d5a77a7ac183c3833e1a3425ead69d4f97501",
                output: "28U1g1W2cdkggV58aVGWoWb1xqrQ4ax76W5itRWpR8ty6mvq4bQZR4mcWkH3koELMp2eELUicevGoji2Mji1V9Hip7oJLnsVcNuQLg",
            },
            {
                input: "0x2fd1a49ed832f69e6e9c63b453ec049c9e7a5cf944232d10353f64434abae060f6506ad3fdb1f4415b0af9ce8c208bc20ee526741539fa3203c77ecba410fd6718f227e0b430f9bcb049a3",
                output: "23h88MEja1kMCErTVtYfKLPpDTYvUdSe54N3t9NKsa7GbELkaFUYB3yfYwuprXqoV3DM1N2AUV4GWeeSveyFuzWjUzM1FrMevXHQDDc",
            },
            {
                input: "0xd38540dc222969120ce80f2007cd42a708a721aa29987b45d4e428811984ecad349cc35dd93515cefe0b002cee5e71c47935e281ebfc4b8b652b69ccb092e55a20f1b9f97d04629612462192",
                output: "MRwEfCwjXboZNQcvSvNhtFfAEgxUDiyjs5fEu7M1A1VyFdN7oJ1AxcncGYiJnXFzBYorJNnDXV7p5YNkXTzZhyf8ddCmXQLGPvzYD8q7",
            },
            {
                input: "0x8739a86671cc180152b953e3bf9d19f825c3dd54ae1688e49efb5efe65dcdad34bc860010e7c8c997cd5f9e320ca7d39d4ba801a175b1c76f057832f3f36d7d893e216e4c7bbdb548d0ba48449",
                output: "zeaej2BeLucysmTBx4smUwaEnocB5Fp8ccZ4w4DHwE4sbkoeV24GXFdsq2nL61sZSddDMr4m9MqJ6ULcdioTaBg5StF1PDNEdqiTUx9Za",
            },
            {
                input: "0x330027368b34f9c69776b4591532da1c5be68ef4eebe8cb8fa7dc5483fb70c2c896334cb1f9cb5dfe044fa086197ff5dfd02f2ba3884c53dd718c8560da743a8e9d4aeae20ccef002d82ca352592",
                output: "2exyZhKSrQmV6ZbYRitaHXw5Kx3gxEfBj4M5gdGr5EffhcWwR655jmyf7Gv63jFQf9VCpe4haXWvxQHEhbxuKDzzmk8DiCHqF61eMFvmwCD",
            },
            {
                input: "0xb8d8f2a8df3b0c35f15b9b370dca80d4ca8e9a133eb52094f2dd5c08731f52315d828846e37df68fd10658b480f2ac84233633957e688e924ffe3713b52c76fd8a56da8bb07daa8eb4eb8f7334f992",
                output: "TUCHnXNP6tuitEPXVCHabBAkWnSkhrzahXRGfYaWr1jgvgLMJBVjk9PpauizaVJW5ffAeDT5jpeF9shj1Sa86oV3agi43EX1YjZmxRQeWeMX",
            },
            {
                input: "0x56e2766a4109150eed424f0f743543cdea66e5baaa03edc918e8305bb19fc0c6b4ddb4aa3886cb5090940fc6d4cabe2153809e4ed60a0e2af07f1b2a6bb5a6017a578a27cbdc20a1759f76b0889a83ce",
                output: "wuy3snxbegtQ94ppG1icEBCXV43CnDnTLkz2HtTikm4unvck3ueTBNLeCYAMP7WTaH6QDBgE665yzBSH89p2J9d8Q2ccphStdL2Z63jHeihuo",
            },
            {
                input: "0x25ce3ca91a4eb5c2f8580819da04d02c41770c01746de44f3db6e3402e7873db7635516e87b33e4b412ba3df68544920f5ea27ec097710954f42158bdba66d4814c064b4112538676095467c89ba98e6a5",
                output: "2pTtEvydJp5FxmzMgGMFuwxu3LXBfz1uXwUTC83xnh2Nt5aFv12XcV1UgfnJv9LDG62bWxjby7ctnHjR53rQLLkpwnAi4fqLGH1HP5ZEvUu2ZPa",
            },
            {
                input: "0x43758d7093a494df5cc36d09c7a6472a41f29c380a987b1ecdcf84765f4e5d3ceefc1c02181f570f44fcd629f08dc1ef53c9ae0d8869fe67fdc7a2c67b425f13c5be8d9f630c1d063c02fd75cf64c1aec9d2",
                output: "FKcb1z9U6JTgBFZnmC3itXjKJzehvjSHAM7nUF3kX78uqBxG15dYwCkPLvX2cfhNhcSnv4ev4y59WJnZYKRt5iAa7cYs58u3hJDoWhaGZgoon12q",
            },
            {
                input: "0xe2ef6e6431d5f5ad0489078dc61f46494dccf403dad7f094170d2c3e29c198b0f341e284c4be8fa60c1a478d6bd55dd2c04dad86d2053d5d25b014e3d8b64322cdcb5004faa46cfa2d6ad2ff933bc3bd9a5a74",
                output: "4fe6CCVZ2dhq5bHVTFV14o6Wa7sHFMEmvcmrhYH7mFdnvHAxZNNEtjZnchnnVNMfApv75ranbCrbDpwVQN9rSTuLLbVAQ8VuSv3nTEq8czVVmXu8Xm",
            },
            {
                input: "0x660af3d048a9a43634c0250427d9a6219197a3f3633f841753ba7c27f3619f387b6b1a6cb9c1dc227674aa020724d137da2cb87b1615d512974fa4747dd1e17d02c9462a44fec150ca3a8f99cc1e4953365e4299",
                output: "8H2LSfmynJN8YNqX3mBaJVw3kQSfTFYn9bXruHYHgxqwyLeDdPuPbiEiufgtUSEEuEY6tQCQku7XDUt9FJgATem9AwATGeM4p4tr6j7y4g5BoBWE4Re",
            },
            {
                input: "0x565e108535b1f62e1d4ba18e17a52164418bfd1a933f7fb3a126c860830a87293d9271da736e4398c1e37fb75c4bf02786e1faf4b610cd1377fbb9ae180655a0abefbad700c09473469f1eca5a66d53fa3dc7cd3e7",
                output: "UBacK5ccv72KUfaLhBm2vCeiua9BEFi1jkUG1nRPAwx3Ws4suhw2k7kxs5WJAQsTCWuVPpP5XnLrs33PakkJemzTDxikgrxdQ7zKw9ff8Hi8K4TaiPdp",
            },
            {
                input: "0xc3b0411d7e145f96eb9654ab94913dda503a50f9e773842f4d2a5faa60869bf365830511f2ededd03e0a73000edb60c9a29a5f5e194cf3b5667a694690384599d116f8d2fd93b2aed55b7d44b5b054f3f38e788e4fdf",
                output: "5gqnPxeX6ADGocxsvofxLVyHmAgroYvPxKmAAxP4hvBuJyVrVuNgrd5JQVcyxEnGZWveqfXo76nZdLyWRyrZU29Gbw89E6CYMA98o2dE9PceQ22saF7XAn",
            },
            {
                input: "0x36e591568c41d1052cad0fcb68ca4c4bf5090d57df9db6f0d91dd8b11b804f331adb7efb087a5604e9e22b4d54db40bcbc6e272ff5eaddfc1471459e59f0554c58251342134a8daaef1498069ba581ef1da2510be92843",
                output: "6obYVpRSnMEHeAULsYmiQfz3x6Mho4tW2W5xaLGeb1XQvQfpCCc362kAmChtquDzjJm6PyXQ1cHvTjs1rGt1AfTSRZjoAppEFZQWn6fSp5EU3SddEMhtBox",
            },
            {
                input: "0x487a4eb8111c79a6f0195fc38ad6aee93c1df2b5897eaa38ad8f47ab2fe0e3aa3e6accbfd4c16d468433185fc61c861b96ca65e34d31f24d6f56ee85092314a4d7656205c15322f1c97613c079eae292ba966e10d1e70016",
                output: "apTSK9bcbqUSguAeHrd4diCsTqqDanjhdDoZF5PhWgiUEcCupev7okJUHRaJJjStwSMTEo8ubHs2c7nApeBV5spcikeqYLz6QvBBgtryUi2yNAVCbUVnZsJd",
            },
            {
                input: "0x4e518b243f424c46f9ea63db1c2c34b512c403c128ee19030a6226517b805a072512a5e4cd274b7fd1fa23f830058208ff1a063b41039c74036b5b3da8b1a0b93135a710352da0f6c31203a09d1f2329651bb3ab3984ab591f",
                output: "3nJ944wYxiu17d8s3rDhgXfGLCfR7MryqeLYpCFUWzxKVuuWcMhqG5qG6DAxJKV7RJeCy6At1mBXeCFz53Rz6tTPNK8rMsNqTEaPydcw9hyQ1cM5xy17fzicqU",
            },
            {
                input: "0x2247e71cd44835e7a1a1b66d8595f7aef9bf39d1417d2d31ea3599d405ff4b5999a86f52f3259b452909b57937d85364d6c23deb4f14e0d9fcee9184df5994fdc11f045c025c8d561adb0e7dfd4748fd4b20f84e53322471a410",
                output: "6NcoXPVSbbdJwzQmcjsNDkvcXoJTGKPZxx583b6wnTX5YAfM33MJ299Tve58qNXXkov1PCdB13x79RQwQVvbqbectQaxypHigfAw3V4og89U6Ro57VfU2QeUfA7",
            },
            {
                input: "0xcdb3fd88e48b2e7eb7ae5dae994cb5eae3eaf21cf9005db560d6d22e4d9b97d7e9e488751afcd72aa176c0fcde9316f676fd527d9c42105b851639f09ea70533d26fc60cbeb4b76ed554fc99177620b28ca6f56a716f8cb384811c",
                output: "3TJCiSiyfYRP89gcZ59RVMJGuL5RbVQUfMUa8aUau8c3dQVtoj7Nk1CcH4x433WZo36g7VnHTfAT3kZR5j6N4tpB7D1R9hfikn2bT9mzLuxSyoM9dYYpYbKeu4AVh",
            },
            {
                input: "0x3e356e7c793acf114c624dc86ace38e67bff2a60e5b2a6c20723c1b9f003e115b304c023792448794546a2474f04294d7a616215e5dd6c40a65bb6edb508c3680b14c176c327fdfb1ee21962c0006b7deb4e5de87db21989d13c3ab0",
                output: "4GwXpy1KxkKwCHXu8HUyLrR4xuB7NHhdNvgBp2hF5g9e9MNkF5u3cX9dAvD9f5J7exh35mXaqva4Z7omc8Bjgd1jwSFxMj3jhVDK2yDu2ixEBGzdQLjJJ4Zx5hvrDD",
            },
            {
                input: "0x462d5d2a52ef4ca0d366ae06a314f50e3a21d9247f814037798cc5e10a63de027477decdeb8a8e0c279299272490106ddf8683126f60d35772c6dfc744b0adbfd5dcf118c4f2b06cfaf077881d733a5e643b7c46976647d1c1d3f8f623",
                output: "HJkAM8UC8ovhRLt9emBtuaLeLCAG1jNih2cAbZWkq2vtgvV1Y5gCczWfPjwBnk1gMgvcSbmVuWPtwGjGwCqCiTFYJ2qN3y3a1NEm4oMShe6YPZAbe51z4LFu9JeMXkW",
            },
            {
                input: "0x7c6218fa86fb47080b1f7966137667bd6661660c43b75b63390b514bbe491aa46b524bde1c5b7456255fb214c3f74907b7ce1cba94210b78b5e68f049fcb002b96a5d38d59df6e977d587abb42d0972d5f3ffc898b3cbec26f104255761a",
                output: "3CZdX9FmcgoCfdT3WrpmYfVfmg2U4qfqXBQ6dsyBQfGjXgvnNmfk3pFJGDyqa42yjAxwaG8g5YmnDtinPDHmi3UoDhNFwpN2LbPAaGbazmvu785rNcR9h9c4PDQeyFcCZ",
            },
            {
                input: "0xee1b8a232d703585dd276ee1f43c8cd7e92a993eb15107d02f59ba75f8dd1442ee37786ddb902deb88dd0ebdbf229fb25a9dca86d0ce46a278a45f5517bff2c049cc959a227dcdd3aca677e96ce84390e9b9a28e0988777331847a59f1225b",
                output: "KapdzKZjQy84qReM2YL39K99Xf5qmev3uWximouXERHZQdWgGUZXM1HkNCeLt5u5DDKNGbKh7MyqHtEMUVyPXkpqxGyjtLuasxnz6WNb6kJKppCChBFN33mCsMtpHv5hxN",
            },
            {
                input: "0x027a66c1421422683dd6081af95e16f248ab03da494112449ce7bdace6c988292f95699bb5e4d9c8d250aa28a6df44c0c265156deb27e9476a0a4af44f34bdf631b4af1146afe34ea988fc953e71fc21ce60b3962313000fe46d757109281f6e",
                output: "rWh552q396bLauZWfBkiPGQNaaioKd1bYCTMBA6A8rzfNnWyE9RzmxNEK8iRgcwwscbSN8zx1FtgFGt8dT2UqsBpTyCH4j6pxAbwU4R77tATtysBGyH9gUvgoXeBW7nvsX",
            },
            {
                input: "0x55bc950200d0834ceb5c41553afd12576f3fbb9a8e05883ccc51c9a1269b6d8e9d27123dce5d0bd6db649c6fea06b4e4e9dea8d2d17709dc50ae8aa38231fd409e9580e255fe2bf59e6e1b6e310610ea4881206262be76120d6c97db969e003947",
                output: "3FMjdBFkztdYza9nwTyMYdNuyfBiNWZpwGg1chvyPr3g4gRWxkNn4E3Xpavbiph8WsKCia6xcAahCFEnBBhsoBCaEnSMFtiyxYCNRAxzUhgFXdqUn7yRrK6bwhuXBPF8Ltmze",
            },
            {
                input: "0xf08bad8fa731f149397c47d2c964e84f090e77e19046277e18cd8917c48a776c9de627b6656203b522c60e97cc61914621c564243913ae643f1c9c9e0ad00a14f66eaa45844229ecc35abb2637317ae5d5e338c68691bea8fa1fd469b7b54d0fccd7",
                output: "UqHFkuyHkW1w3mQCF2RaWc8EkQkdYX9TZZCNFSegmdLmgE4wDmjjNpHuhTMgxSbDUbq7GQjBBwTfDWUympsmEdKKj7wBRqjkA8pdFWPhstdfzD5qKtgzVFQZz1J1czg15meGAi",
            },
            {
                input: "0x30c1284ec7e6fccdec800b8fa67e6e55ac574f1e53a65ab9764c218a404184793cc9892308e296b334c85f7097edc16927c2451c4cd7e53f239aa4f4c83241bde178f692898b1ece2dbcb19a97e64c4710326528f24b099d0b674bd614fad307d9b944",
                output: "Ru8wQDcPgkiU3Jo3WnAt4cpHyjTRLXYcBcNpiKwapEhQGbef6vRxFDaTA5htW6WXw2N9Awm1fWPrSMC2vN2qmjn4jr5aA1grgpDKL5oa9C8bUvtHhVbQqimF4H5naQBX37kqGSF",
            },
        ];
        it("Should able to encode", async function () {
            const { contract, owner } = await loadFixture(deployBase58);
            for (const item of testCases) {
                expect(await contract.encodeToString(item.input)).to.equal(
                    item.output
                );
            }
        });
        it("Should able to decode", async function () {
            const { contract, owner } = await loadFixture(deployBase58);
            for (const item of testCases) {
                expect(await contract.decodeFromString(item.output)).to.equal(
                    item.input
                );
            }
        });
    });
});
