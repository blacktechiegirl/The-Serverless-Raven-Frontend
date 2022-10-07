import React from 'react';

const Skeleton = () => {
    return(
        <div class="border bg-[#0c070717] shadow rounded-md p-6  w-full my-4">
  <div class="animate-pulse flex space-x-4">
    <div class="rounded-full bg-white h-10 w-10"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 bg-white rounded"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="h-2 bg-white rounded col-span-2"></div>
          <div class="h-2 bg-white rounded col-span-1"></div>
        </div>
        <div class="h-2 bg-white rounded"></div>
      </div>
    </div>
  </div>
</div>
    )
}

export default Skeleton;