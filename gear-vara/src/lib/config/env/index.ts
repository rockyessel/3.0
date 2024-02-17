export const ADDRESS = String(process.env.NEXT_PUBLIC_NODE_ADDRESS)
if (!process.env.ADDRESS) {
    console.log('🔴 Cannot find ADDRESS URL');
}
