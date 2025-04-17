import React from 'react'
import {motion} from "framer-motion"
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { ArrowLeft } from 'lucide-react'

const BackNavigation = () => {
  return (
    <motion.nav
        className="flex items-center justify-between py-6 px-24"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Button variant="text" href="/" className="mr-auto" icon={<ArrowLeft size={18} />}>
          <span className="sr-only">Back</span>
        </Button>
        <Logo/>
      </motion.nav>
  )
}

export default BackNavigation