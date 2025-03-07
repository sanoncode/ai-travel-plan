import React from 'react'

function GoogleLoginDialog({openLoginDialog}) {
  return (
    <Dialog open={openLoginDialog}>
    <DialogContent>
      <DialogHeader>
        <DialogDescription>
          <img src="/logo.svg" />
          <h2 className="font-extrabold text-lg mt-7">
            Sign in with google
          </h2>
          <p>sign in to the App with Google Authentication securely</p>
          <Button onClick={() => GoogleLogin()} className="mt-10 w-full">
            <FcGoogle />
            Signin With Google
          </Button>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  )
}

export default GoogleLoginDialog
