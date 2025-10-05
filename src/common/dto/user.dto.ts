/* eslint-disable prettier/prettier */
interface UserData {
    id?: number;
    full_name?: string;
    username?: string;
    email?: string;
    mobile?: string;
    avatar?: string;
    is_otp_verified?: number;
    status?: number;
    created_at?: Date;
  }
  
  export class UserResponseDto {
    id: number;
    full_name: string;
    username: string;
    email: string;
    mobile: string;
    avatar: string;
    is_otp_verified: number;
    status: number;
    created_at: Date;
  
    constructor(userData: UserData) {
      this.id = userData.id || 0;
      this.full_name = userData.full_name || '';
      this.username = userData.username || '';
      this.email = userData.email || '';
      this.mobile = userData.mobile || '';
      this.avatar = userData.avatar || '';
      this.is_otp_verified = userData.is_otp_verified || 0;
      this.status = userData.status || 1;
      this.created_at = userData.created_at || new Date();
    }
  }
  