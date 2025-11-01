import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className='flex items-center justify-between px-20 py-4'>
      <Link href='/' className='text-2xl font-normal cursor-pointer'>
        Samadhi
      </Link>

      <div className='flex items-center space-x-1'>
        <Button variant='ghost' className='text-base font-normal h-9'>
          로그인
        </Button>

        <Button variant='ghost' className='text-base font-normal h-9'>
          회원가입
        </Button>
      </div>
    </nav>
  );
}
