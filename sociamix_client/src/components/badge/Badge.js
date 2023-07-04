import { VerifiedUser } from '@mui/icons-material'
import React from 'react'
import './badge.css'
import { Tooltip } from '@mui/material'

export default function Badge({ fontSize, margin, statut }) {
    return (
        <>
            {statut &&
                <Tooltip title='Administrator' placement='top'>
                    <VerifiedUser className='badge' style={{ fontSize: fontSize, margin: margin }} />
                </Tooltip>
            }
        </>
    )
}
