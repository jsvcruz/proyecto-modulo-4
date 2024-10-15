'use client'

import { useAccount, useConnect, useDisconnect, useWriteContract } from 'wagmi'
import { stakingABI } from '@/contracts/Staking'
import { STAKING_CONTRACT_ADDRESS } from '@/constants/constants'
import { useState } from 'react'

function App() {
  const account = useAccount()
  const { connectors, connect, status, error } = useConnect()
  const { disconnect } = useDisconnect()
  const { writeContract } = useWriteContract()
  const [approveAddress, setApproveAddress] = useState('')
  const [transferAddress, setTransferAddress] = useState('')

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
      <div>
        <h2>Approve</h2>
        Digitar la dirección a aprobar:<br />
        <input type="text" id="approve-address-input" value={approveAddress} onChange={(e) => setApproveAddress(e.target.value)} style={{ width: '400px' }} /><br />
        <button
          onClick={() =>
            writeContract({
              abi: stakingABI,
              address: STAKING_CONTRACT_ADDRESS,
              functionName: 'approve',
              args: [
                approveAddress as `0x${string}`,
              ],
            })
          }
        >
          Approve
        </button>
      </div>
      <div>
        <h2>Transfer Ownership</h2>
        Digitar la dirección a la cual se transferirá el ownership:<br />
        <input type="text" id="approve-address-input" value={transferAddress} onChange={(e) => setTransferAddress(e.target.value)} style={{ width: '400px' }} /><br />
        <button
          onClick={() =>
            writeContract({
              abi: stakingABI,
              address: STAKING_CONTRACT_ADDRESS,
              functionName: 'approve',
              args: [
                approveAddress as `0x${string}`,
              ],
            })
          }
        >
          Approve
        </button>
      </div>
      <div>
        <h2>Pause</h2>
        Pausar el contrato:<br />
        <button
          onClick={() =>
            writeContract({
              abi: stakingABI,
              address: STAKING_CONTRACT_ADDRESS,
              functionName: 'pause',
              args: [],
            })
          }
        >
          Pausar
        </button>
      </div>
      <div>
        <h2>Unpause</h2>
        Continuar el contrato:<br />
        <button
          onClick={() =>
            writeContract({
              abi: stakingABI,
              address: STAKING_CONTRACT_ADDRESS,
              functionName: 'unpause',
              args: [],
            })
          }
        >
          Continuar
        </button>
      </div>
    </>
  )
}

export default App
