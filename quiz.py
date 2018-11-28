# Question 2
from cryptography.fernet import Fernet

key = 'TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM='

# Oh no! The code is going over the edge! What are you going to do?
message = b'gAAAAABb9EXMuLCjrmcytcE4nWml52pv1e_CbDybyhJHE9ukdr4c53P5VCiWVbeKgOcpuBbAcxukEv8PjP0nQZw-_tV4--l-fyEc0X2jZNExRX_YJ2ngFWkZm3_3S_JnahHAepyyCk1-8vpbak9PAoc6C9Du5rxhoHGSacrQvoQTRyNexfaXTNs='


def main():
    f = Fernet(key)
    print(f.decrypt(message))
    # https://engineering-application.britecore.com/e/t20e118s10t/ProductEngineer


if __name__ == "__main__":
    main()


