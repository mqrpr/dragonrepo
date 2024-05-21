export const InteractWithWLClick = async (address) => {
  // Define the whitelist levels and corresponding addresses
  const whitelist = {
    1: ['0x1234567890123456789012345678901234567890', '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd'],
    2: ['0x9876543210987654321098765432109876543210', '0xfedcbafedcbafedcbafedcbafedcbafedcbafedc'],
    3: ['0xaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb'],
    4: ['0xcccccccccccccccccccccccccccccccccccccccc', '0xdddddddddddddddddddddddddddddddddddddddd'],
    5: ['0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', '0xffffffffffffffffffffffffffffffffffffffff'],
    6: ['0x1111111111111111111111111111111111111111', '0x2222222222222222222222222222222222222222'],
    7: ['0x3333333333333333333333333333333333333333', '0x4444444444444444444444444444444444444444']
  };

  // Array to store the whitelist levels found
  const whitelistLevels = [];

  // Loop through each whitelist level
  for (let i = 1; i <= 7; i++) {
    // Check if the address is in the whitelist for this level
    if (whitelist[i] && whitelist[i].includes(address)) {
      whitelistLevels.push(i);
    }
  }

  // If no whitelist levels found, return "NOT WHITELISTED"
  if (whitelistLevels.length === 0) {
    const message = "NOT WHITELISTED";
    console.log(message);
    return message;
  }

  // If whitelisted, return the levels found
  const levelText = whitelistLevels.map(level => `LEVEL ${level}`).join(', ');
  const message = `${levelText} WHITELISTED`;
  console.log(message);
  return message;
};
