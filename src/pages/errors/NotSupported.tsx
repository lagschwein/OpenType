export default function NotSupported() {
  return (
    <>
    <div className="flex h-screen justify-center items-center">
      <h1 className="text-3xl">This browser does not support WebGpu</h1>
      <h2 className="text-2xl">Please use use a supporter browser</h2>
      <a href="https://github.com/gpuweb/gpuweb/wiki/Implementation-Status"><p>supported browsers</p></a>
    </div>
    </>
  )
}